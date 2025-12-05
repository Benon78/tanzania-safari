import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
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

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData(emptyDestination);
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
      best_time: d.best_time || '',
      is_active: d.is_active,
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

    const payload = {
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      description: formData.description || null,
      image_url: formData.image_url || null,
      highlights: highlightsArray.length > 0 ? highlightsArray : null,
      best_time: formData.best_time || null,
      is_active: formData.is_active,
    };

    let error;

    if (editingId) {
      const result = await apiUpdateDestination(editingId, payload);
      error = result.error;
    } else {
      const result = await apiCreateDestination(payload);
      error = result.error;
    }

    setIsSaving(false);

    if (error) {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    } else {
      toast({ title: editingId ? 'Destination updated' : 'Destination created' });
      setIsDialogOpen(false);
      fetchDestinations();
    }
  };

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
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
              <Label>Best Time</Label>
              <Input
                value={formData.best_time}
                onChange={(e) => setFormData({ ...formData, best_time: e.target.value })}
              />
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
