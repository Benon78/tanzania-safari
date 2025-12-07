import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { tours } from '@/data/tours';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';

// ------------------------------
// Dummy backend placeholders
// Replace with real API later
// ------------------------------

async function apiGetDestinations() {
  return { data: [], error: null };
}

async function apiCreateDestination(payload) {
  return { error: null };
}

async function apiUpdateDestination(id, payload) {
  return { error: null };
}

async function apiDeleteDestination(id) {
  return { error: null };
}

async function apiToggleStatus(id, newStatus) {
  return { error: null };
}

// ------------------------------

const emptyDestination = {
  name: '',
  slug: '',
  description: '',
  image_url: '',
  highlights: '',
  best_time: '',
  is_active: true,
  linkedTours: [],
  // Option to create an actual placeholder tour (stored in the global `tours` array)
  createPlaceholderTour: false,
  // Fields used to build the placeholder tour if requested
  placeholderTitle: '',
  placeholderCategory: '',
  placeholderDuration: '',
  placeholderPrice: '',
  placeholderImage: '',
  placeholderShortDescription: '',
  placeholderHighlights: '',
  placeholderGallery: '',
  placeholderItinerary: [],
  placeholderInclusions: '',
  placeholderExclusions: '',
};

export default function DestinationsAdmin() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyDestination);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    const { data, error } = await apiGetDestinations();

    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch destinations', variant: 'destructive' });
    } else {
      setDestinations(data || []);
    }
    setIsLoading(false);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const generateUniqueSlug = (name) => {
    const base = generateSlug(name);
    let slug = base;
    let i = 1;
    while (destinations.some(d => d.slug === slug && d.id !== editingId)) {
      slug = `${base}-${i++}`;
    }
    return slug;
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData({ ...emptyDestination });
    setIsDialogOpen(true);
  };

  const openEditDialog = (d) => {
    setEditingId(d.id);
    setFormData({
      name: d.name,
      slug: d.slug,
      description: d.description || '',
      image_url: d.image_url || '',
      highlights: d.highlights?.join(', ') || '',
      linkedTours: d.linkedTours || [],
      best_time: d.best_time || '',
      is_active: d.is_active,
      createPlaceholderTour: false,
      placeholderTitle: '',
      placeholderCategory: '',
      placeholderDuration: '',
      placeholderPrice: '',
      placeholderImage: '',
      placeholderShortDescription: '',
      placeholderHighlights: '',
      placeholderGallery: '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const highlightsArray = formData.highlights
      .split(',')
      .map((h) => h.trim()) 
      .filter(Boolean);

    let payload = {
      name: formData.name,
      slug: formData.slug || generateUniqueSlug(formData.name),
      description: formData.description || null,
      image_url: formData.image_url || null,
      highlights: highlightsArray.length > 0 ? highlightsArray : null,
      best_time: formData.best_time || null,
      is_active: formData.is_active,
      linkedTours: formData.linkedTours && formData.linkedTours.length > 0 ? formData.linkedTours : null,
    };

    // If the admin asked to create a placeholder tour for this destination,
    // build a real tour object and add it to the in-memory `tours` array,
    // then link it to the created destination.
    let createdTourId = null;
    if (formData.createPlaceholderTour) {
      const tourId = Date.now().toString();
      const tourSlugBase = payload.slug || generateUniqueSlug(formData.name);
      const newTour = {
        id: tourId,
        slug: `${tourSlugBase}`,
        destinationSlug: tourSlugBase,
        title: formData.placeholderTitle || `${formData.name} Sample Tour`,
        category: formData.placeholderCategory || 'safari',
        duration: formData.placeholderDuration || '',
        price: formData.placeholderPrice ? Number(formData.placeholderPrice) : null,
        image: formData.placeholderImage || null,
        shortDescription: formData.placeholderShortDescription || null,
        highlights: formData.placeholderHighlights
          ? formData.placeholderHighlights.split(',').map(h => h.trim()).filter(Boolean)
          : [],
        itinerary: formData.placeholderItinerary?.map(it => ({ day: Number(it.day), title: it.title || '', description: it.description || '' })) || [],
        inclusions: formData.placeholderInclusions ? formData.placeholderInclusions.split(',').map(i => i.trim()).filter(Boolean) : [],
        exclusions: formData.placeholderExclusions ? formData.placeholderExclusions.split(',').map(i => i.trim()).filter(Boolean) : [],
        gallery: formData.placeholderGallery
          ? formData.placeholderGallery.split(',').map(g => g.trim()).filter(Boolean)
          : [],
      };

      // Ensure linkedTours includes the created tour
      payload.linkedTours = payload.linkedTours ? [...payload.linkedTours, tourId] : [tourId];
      payload = newTour ? {...payload,...newTour} : payload
    }

    let error;

    // Since we don't have a real backend yet, update local state directly
    if (editingId) {
      setDestinations(prev => prev.map(d => d.id === editingId ? { ...d, ...payload } : d));
      toast({ title: 'Destination updated' });
    } else {
      const newDest = { id: Date.now().toString(), ...payload };
      setDestinations(prev => [newDest, ...prev]);
      toast({ title: 'Destination created' });
    }
    
    
    setIsSaving(false);
    setIsDialogOpen(false);
  };
  console.log(destinations)

  const deleteDestination = async (id) => {
    if (!confirm('Delete this destination?')) return;

    const { error } = await apiDeleteDestination(id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    } else {
      toast({ title: 'Destination deleted' });
      setDestinations(destinations.filter((d) => d.id !== id));
    }
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await apiToggleStatus(id, !currentStatus);

    if (!error) {
      setDestinations(
        destinations.map((d) =>
          d.id === id ? { ...d, is_active: !currentStatus } : d
        )
      );
    } else {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Destinations</h1>
          <p className="text-muted-foreground">Manage tour destinations</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Destination
        </Button>
      </div>

      {destinations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No destinations yet</p>
            <Button onClick={openCreateDialog} className="mt-4">
              <Plus className="h-4 w-4 mr-2" /> Add your first destination
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <Card key={destination.id} className={!destination.is_active ? 'opacity-60' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{destination.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">/{destination.slug}</p>
                  </div>
                  <Switch
                    checked={destination.is_active}
                    onCheckedChange={() => toggleActive(destination.id, destination.is_active)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {destination.image_url && (
                  <img
                    src={destination.image_url}
                    alt={destination.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}

                {destination.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {destination.description}
                  </p>
                )}

                {destination.best_time && (
                  <p className="text-xs text-muted-foreground">
                    Best time: {destination.best_time}
                  </p>
                )}

                {destination.linkedTours && destination.linkedTours.length > 0 && (
                  <p className="text-xs text-golden">Contains {destination.linkedTours.length} linked tour{destination.linkedTours.length !== 1 ? 's' : ''}</p>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(destination)}>
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteDestination(destination.id)}>
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Destination' : 'Add Destination'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update destination details' : 'Create a new tour destination'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: editingId ? formData.slug : generateSlug(e.target.value),
                    exampleTour: {
                      ...formData.exampleTour,
                      destinationSlug: editingId ? formData.exampleTour?.destinationSlug : generateSlug(e.target.value),
                    },
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value, exampleTour: { ...formData.exampleTour, destinationSlug: e.target.value } })}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Highlights (comma separated)</Label>
              <Input
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Link Tours (optional)</Label>
              <select
                multiple
                value={formData.linkedTours}
                onChange={(e) => setFormData({ ...formData, linkedTours: Array.from(e.target.selectedOptions).map(o => o.value) })}
                className="w-full border border-input rounded-md p-2 bg-background"
              >
                {tours.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">Select one or more tours to associate with this destination.</p>
            </div>

            <div className="space-y-2">
              <Label>Best Time</Label>
              <Input
                value={formData.best_time}
                onChange={(e) => setFormData({ ...formData, best_time: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.createPlaceholderTour}
                  onCheckedChange={(checked) => setFormData({ ...formData, createPlaceholderTour: checked })}
                />
                <Label>Create placeholder tour for this destination</Label>
              </div>
              {formData.createPlaceholderTour && (
                <div className="grid grid-cols-1 gap-2">
                  <div className="space-y-2">
                    <Label>Placeholder Tour Title</Label>
                    <Input
                      value={formData.placeholderTitle || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderTitle: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={formData.placeholderCategory || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderCategory: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={formData.placeholderDuration || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderDuration: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      value={formData.placeholderPrice ?? ''}
                      onChange={(e) => setFormData({ ...formData, placeholderPrice: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Short Description</Label>
                    <Input
                      value={formData.placeholderShortDescription || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderShortDescription: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={formData.placeholderImage || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderImage: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Highlights (comma separated)</Label>
                    <Input
                      value={formData.placeholderHighlights || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderHighlights: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gallery URLs (comma separated)</Label>
                    <Input
                      value={formData.placeholderGallery || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderGallery: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Itinerary (add items)</Label>
                    {formData.placeholderItinerary?.map((item, idx) => (
                      <div key={idx} className="bg-card p-3 rounded space-y-2">
                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-2">
                            <Label className="text-xs">Day</Label>
                            <Input
                              type="number"
                              className="mt-1"
                              value={item.day}
                              onChange={(e) => {
                                const next = [...(formData.placeholderItinerary || [])];
                                next[idx] = { ...next[idx], day: Number(e.target.value) };
                                setFormData({ ...formData, placeholderItinerary: next });
                              }}
                            />
                          </div>

                          <div className="col-span-10">
                            <Label className="text-xs">Title</Label>
                            <Input
                              className="mt-1"
                              value={item.title}
                              onChange={(e) => {
                                const next = [...(formData.placeholderItinerary || [])];
                                next[idx] = { ...next[idx], title: e.target.value };
                                setFormData({ ...formData, placeholderItinerary: next });
                              }}
                              placeholder="e.g. Transfer & Boat Safari"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">Description</Label>
                          <Textarea
                            className="mt-1"
                            value={item.description}
                            onChange={(e) => {
                              const next = [...(formData.placeholderItinerary || [])];
                              next[idx] = { ...next[idx], description: e.target.value };
                              setFormData({ ...formData, placeholderItinerary: next });
                            }}
                            placeholder="Brief description for this day"
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button type="button" variant="ghost" onClick={() => {
                            const next = [...(formData.placeholderItinerary || [])];
                            next.splice(idx, 1);
                            setFormData({ ...formData, placeholderItinerary: next });
                          }}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" size="sm" onClick={() => setFormData({ ...formData, placeholderItinerary: [ ...(formData.placeholderItinerary || []), { day: (formData.placeholderItinerary?.length || 0) + 1, title: '', description: '' } ] })}>Add itinerary item</Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Inclusions (comma separated)</Label>
                    <Input
                      value={formData.placeholderInclusions || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderInclusions: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Exclusions (comma separated)</Label>
                    <Input
                      value={formData.placeholderExclusions || ''}
                      onChange={(e) => setFormData({ ...formData, placeholderExclusions: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>Active</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="flex-1">
                {isSaving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
