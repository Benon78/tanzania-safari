import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

/**
 * TanzaniaMap.jsx
 *
 * - Loads /tz.svg (place tz.svg in public/)
 * - Injects SVG inline so <path> elements are interactive
 * - Groups regions into tourism circuits (adjust REGION_TO_CIRCUIT to taste)
 * - Adds hover tooltip, selection, legend, and toggle per-circuit visibility
 *
 * Usage:
 * <TanzaniaMap onRegionClick={(regionName) => ...} selectedRegion={selectedRegion} />
 */

const CIRCUIT_PALETTE = {
  'Northern Circuit': '#0ea5a4',      // teal
  'Southern Circuit': '#059669',      // green
  'Western Circuit': '#d97706',       // amber
  'Coastal & Islands': '#0284c7',     // blue
  'Southern Highlands': '#7c3aed',    // purple
    'Lake Zone' : '#72bbe0ff',
  Other: '#64748b',  
  "Central Circuit": '#bdd906ff',                 // gray
};


// Expanded tourism-focused mapping for all 31 official Tanzanian regions with
// the first letter of each key capitalized (camelCase to PascalCase-like keys).

const REGION_TO_TOURISM_CIRCUIT = {
  // Northern Circuit
  Arusha: "Northern Circuit",
  Kilimanjaro: "Northern Circuit",
  Manyara: "Northern Circuit",
  Tanga: "Northern Circuit",
  Mara: "Northern Circuit",

  // Eastern (Coastal) / Southeast links
  "Dar-es-salaam": "Coastal & Islands",
  Morogoro: "Coastal & Islands", // includes Mikumi access; coastal towns nearby
  Pwani: "Coastal & Islands",
  Zanzibar: "Coastal & Islands",
  "Kaskazini Pemba": "Coastal & Islands",
  "Kaskazini Unguja": "Coastal & Islands",
  "Kusini Pemba": "Coastal & Islands",
  "Kusini Unguja": "Coastal & Islands",

  // Lake Zone (pragmatic grouping around Lake Victoria)
  Mwanza: "Lake Zone",
  Geita: "Lake Zone",
  Kagera_Lake: "Lake Zone", // alias; remove if not needed
  Simiyu: "Lake Zone",       // officially a region in some lists; include for completeness
  Shinyanga: "Lake Zone",    // often associated with lake region considerations

  // Southern Circuit / Southern Highlands blend
  Morogoro_South: "Southern Circuit", // alias if you treat additional subregions
  Iringa: "Southern Circuit",
  Mbeya: "Southern Highlands",           // core for Southern Highlands
  Songwe: "Southern Highlands",
  Njombe: "Southern Circuit",
  Rukwa: "Southern Highlands",
  Ruvuma: "Southern Circuit",           // sometimes listed under "Ruvuma" region
  Mtwara: "Southern Circuit",
  Lindi: "Southern Circuit",

  // Western Circuit
  Tabora: "Western Circuit",
  Kigoma: "Western Circuit",
  Katavi: "Western Circuit",
  Kagera: "Western Circuit",
  "Mjini Magharibi": "Coastal & Islands",

  // Central Tanzania / Dodoma region cluster
  Dodoma: "Central Circuit",
  Singida: "Central Circuit",

  // Note: This mapping aims to cover the commonly recognized 31 regions.
  // If your target year lists slightly different official regions, adjust keys accordingly.
};


// Helper to normalize region names for matching
function normalizeName(name = '') {
  return name
    .replace(/[,()\.]/g, '')
    .replace(/\s+/g, '_')
    .trim();
}

// 'Northern Circuit',
//   'Southern Circuit',
//   'Western Circuit',
//   'Coastal & Islands',
//   'Southern Highlands',
// 1. Map SVG region IDs to tourism regions
const REGION_MAP = {
  TZ01: "Northern Circuit",
  TZ02: "Coastal & Islands",
  TZ03: "Lake Zone",
  TZ04: "Lake Zone",
  TZ05: "Western Circuit",
  TZ06: "Southern Circuit",                                 
  TZ07: "Southern Circuit",
  TZ08: "Southern Circuit",
  TZ09: "Coastal & Islands",
  TZ10: "Coastal & Islands",
  TZ11: "Eastern Circuit",
  TZ12: "Coastal & Islands",
  TZ13: "Coastal & Islands",
  TZ14: "Western Circuit",
  TZ15: "Lake Zone",
  TZ16: "Southern Circuit",
  TZ17: "Coastal & Islands",      // Assign Lindi to Coastal or another region
  TZ25: "Coastal & Islands"
};
 
// helper fn to add or update regions
function addOrUpdateRegion( code, region_id, class_id) {
    REGION_MAP[code] = REGION_TO_TOURISM_CIRCUIT[region_id] || REGION_TO_TOURISM_CIRCUIT[class_id];
    return null;
}

export function TanzaniaMap({ onRegionClick, selectedRegion: selectedProp }) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(selectedProp || null);
  const [visibleCircuits, setVisibleCircuits] = useState(() =>
    Object.keys(CIRCUIT_PALETTE).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );

 
  const navigate = useNavigate();

  useEffect(() => {
    // If parent controls selectedRegion, reflect it
    if (selectedProp !== undefined) setSelectedRegion(selectedProp);
  }, [selectedProp]);

  useEffect(() => {
    // Load the SVG file from public root and inject inline into container
    let mounted = true;
    const fetchAndInject = async () => {
      try {
        const resp = await fetch('/tz.svg');
        if (!resp.ok) throw new Error('Failed to load tz.svg');
        const svgText = await resp.text();
        if (!mounted) return;

        // Inject SVG into container as inline SVG
        // We keep only the <svg ...>...</svg> root
        const svgMatch = svgText.match(/<svg[\s\S]*<\/svg>/i);
        const svgFragment = svgMatch ? svgMatch[0] : svgText;

        if (containerRef.current) {
          containerRef.current.innerHTML = svgFragment;
          setSvgLoaded(true);
          // After injection, enhance the SVG
          enhanceSvg(containerRef.current);
        }
    } catch (err) {
        console.error('Error loading tz.svg:', err);
        // keep svgLoaded false
        setSvgLoaded(false);
      }
    };

    fetchAndInject();
    return () => {
      mounted = false;
    };
  }, []);

  // Map of pathElement -> meta {name, circuit, id}
  const enhanceSvg = (root) => {
    // Find the first svg element inside the container
    const svgEl = root.querySelector('svg');
    if (!svgEl) return;

    // make svg responsive and styled
    svgEl.setAttribute('width', '100%');
    svgEl.setAttribute('height', '500');
    svgEl.style.maxWidth = '100%';
    svgEl.style.display = 'block';
    svgEl.style.margin = '0 auto';

    // Global style adjustments for clarity
    svgEl.style.stroke = '#ffffff';
    svgEl.style.strokeWidth = '0.6';
    svgEl.style.shapeRendering = 'geometricPrecision';

    // Collect candidate region elements (paths, polygons, g > path, etc.)
    // Simplemaps often places shapes as <path> inside <g id="features"> — we will target common tags
    const candidateSelectors = [
      'path',
      'polygon',
      'rect',
      'circle',
      'g > path',
      'g > polygon',
    ];
    const elems = Array.from(svgEl.querySelectorAll(candidateSelectors.join(',')));

    // Build a list of elements with friendly names
    const regionElements = elems
      .map((el) => {
        // get friendly name: check title child, data-name, id, aria-label
        let name = null;
        let name_id = null;
        let class_id = null;
        const title = el.querySelector && el.querySelector('title');
        if (title && title.textContent.trim()) name = title.textContent.trim();
        if (!name) name = el.getAttribute('data-name') || el.getAttribute('data-title') || el.getAttribute('aria-label') || el.getAttribute('id') || null;
        if (name) name = name.replace(/[_\-]/g, ' ').trim();
        if(el.getAttribute('name')) name_id = el.getAttribute('name')
        if(el.getAttribute('class')) class_id = el.getAttribute('class')
            addOrUpdateRegion(el.id,name_id,class_id)
        return { el, name, name_id, class_id};
      })
      .filter((r) => r.name); // keep only elements we can name
      // If nothing had names, try to use parent group's title or id
      if (regionElements.length === 0) {
          const groups = Array.from(svgEl.querySelectorAll('g'));
          groups.forEach((g) => {
              const title = g.querySelector && g.querySelector('title');
              const gName = (title && title.textContent.trim()) || g.getAttribute('id') || null;
              if (gName) {
                  const innerPaths = Array.from(g.querySelectorAll('path, polygon, rect, circle'));
                  innerPaths.forEach((inner) => regionElements.push({ el: inner, name: gName }));
                }
            });
        }

    // Prepare styling for each element and attach events
    regionElements.forEach(({ el, name, name_id, class_id }) => {
      const normalized = normalizeName(el.id);
      const circuit = REGION_MAP[normalized] || 'Other';
      const color = CIRCUIT_PALETTE[circuit] || CIRCUIT_PALETTE.Other;

      // Base styles (clear and subtle)
      el.style.transition = 'transform 180ms ease, opacity 180ms ease, filter 180ms ease';
      el.style.transformOrigin = 'center center';
      el.style.cursor = 'pointer';
      el.style.fill = color;
      el.style.fillOpacity = 0.12;
      el.style.stroke = '#ffffff';
      el.style.strokeWidth = '0.8';
      el.dataset.regionName = name_id || class_id;
      el.dataset.circuit = circuit;

      // Hover handlers
      el.addEventListener('mouseenter', (ev) => {
        setHovered({ name_id, class_id, circuit, el });
        // bring to front
        try {
          el.style.fillOpacity = 0.22;
          el.style.filter = 'brightness(1.02) saturate(1.05)';
          el.style.transform = 'scale(1.02)';
        } catch (e) {}
        showTooltip(ev, name_id, class_id, circuit);
      });
      el.addEventListener('mousemove', (ev) => {
        moveTooltip(ev);
      });
      el.addEventListener('mouseleave', () => {
        setHovered(null);
        el.style.fillOpacity = el.dataset.selected === 'true' ? 0.28 : 0.12;
        el.style.filter = '';
        el.style.transform = '';
        hideTooltip();
      });

      el.addEventListener('click', (ev) => {
        // toggle selection
        const currentlySelected = selectedRegion === name_id;
        const newSel = currentlySelected ? null : class_id;
        setSelectedRegion(REGION_MAP[newSel]);
        // update dataset & styling on all region elements
        regionElements.forEach(({ el: e2 }) => {
          const isSel = (e2.dataset.circuit === selectedRegion);
          e2.dataset.selected = isSel ? 'true' : 'false';
          e2.style.fillOpacity = isSel ? 0.28 : 0.12;
          e2.style.strokeWidth = isSel ? '2' : '0.8';
        });
        // call external handler after a short delay to allow UI change
        if (onRegionClick) {onRegionClick(circuit); toggleCircuit(circuit)};
        // optional: navigate to anchor by slug if you use id anchors in destinations pages
        // const slug = (name || '').toLowerCase().replace(/\s+/g, '-');
        // navigate(`/destinations#${slug}`);
        ev.stopPropagation();
      });
    });

    // Initial visibility: circuits toggles will control per-element opacity
    applyCircuitVisibility(svgEl, visibleCircuits);
  };

  // tooltip helpers
  const showTooltip = (ev, name_id, class_id, circuit) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'none';
    tooltip.innerHTML = `<div class="font-semibold text-sm">${name_id? name_id:class_id}</div><div class="text-xs text-muted-foreground">${circuit}</div>`;
    moveTooltip(ev);
  };

  const moveTooltip = (ev) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    const offset = 350;
    const x = ev.pageX -200 ;
    const y = ev.pageY - 600;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  const hideTooltip = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    tooltip.style.opacity = '0';
  };

  const applyCircuitVisibility = (svgEl, visibilityMap) => {
    if (!svgEl) {
      const root = containerRef.current;
      if (!root) return;
      svgEl = root.querySelector('svg');
      if (!svgEl) return;
    }
    const elems = Array.from(svgEl.querySelectorAll('[data-circuit]'));
    elems.forEach((el) => {
      const cir = el.dataset.circuit;
      const visible = visibilityMap[cir] ?? true;
      el.style.opacity = visible ? '0.5' : '1';
      el.style.pointerEvents = visible ? 'auto' : 'auto';
      el.style.filter = visible ? 'grayscale(80%)' : 'brightness(1.02) saturate(1.05)';
    });
  };

  // Toggle circuit visibility from legend
  function toggleCircuit(circuit){
    setVisibleCircuits((prev) => {
      const next = { ...prev, [circuit]: !prev[circuit] };
      // reapply visibility to injected svg
      const root = containerRef.current;
      if (root) {
        const svgEl = root.querySelector('svg');
        if (svgEl) applyCircuitVisibility(svgEl, next);
      }
      return next;
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div ref={containerRef} className="w-full h-auto" style={{position: 'relative'}} />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className=" z-50 p-2 bg-background/95 border border-border rounded shadow text-left transition-opacity"
        style={{ pointerEvents: 'none', opacity: 0, transform: 'translateZ(0)', left: 0, top: 0, position: 'absolute' }}
      />

      {/* Legend / Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
        <div className="col-span-2 flex flex-wrap gap-2">
          {Object.keys(CIRCUIT_PALETTE).map((c) => (
            <button
              key={c}
              onClick={() =>{ onRegionClick(c); toggleCircuit(c)}}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-full border transition',
                selectedRegion === c ? 'bg-white/80 shadow-sm' : 'bg-muted'
              )}
              style={{ borderColor: selectedRegion === c ? CIRCUIT_PALETTE[c] : undefined }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CIRCUIT_PALETTE[c] }} />
              <span className="text-xs font-medium">{c}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-end md:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Reset selections & visibility
              setSelectedRegion(null);
              onRegionClick(null)
              setHovered(null);
              setVisibleCircuits(Object.keys(CIRCUIT_PALETTE).reduce((a, k) => ((a[k] = true), a), {}));
              // reapply if svg loaded
              const root = containerRef.current;
              if (root) {
                const svgEl = root.querySelector('svg');
                if (svgEl) applyCircuitVisibility(svgEl, Object.keys(CIRCUIT_PALETTE).reduce((a, k) => ((a[k] = true), a), {}));
                // remove selected dataset
                if (svgEl) {
                  Array.from(svgEl.querySelectorAll('[data-region-name]')).forEach((el) => {
                    el.dataset.selected = 'false';
                    el.style.fillOpacity = '0.12';
                    el.style.strokeWidth = '0.8';
                  });
                }
              }
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Small accessibility hints */}
      <div className="mt-3 text-xs text-muted-foreground">
        Click a region to select it. Hover for name. Use legend buttons to filter circuits.
      </div>
    </div>
  );
}

export default TanzaniaMap;
