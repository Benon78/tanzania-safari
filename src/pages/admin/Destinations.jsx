import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, MapPin, Upload, X } from 'lucide-react';

const emptyDestination = {
  name: '',
  slug: '',
  description: '',
  image_url: '',
  highlights: '',
  best_time: '',
  is_active: true,
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function DestinationsAdmin() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyDestination);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name');

    if (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to fetch destinations', 
        variant: 'destructive' 
      });
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
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (destination) => {
    setEditingId(destination.id);
    setFormData({
      name: destination.name,
      slug: destination.slug,
      description: destination.description || '',
      image_url: destination.image_url || '',
      highlights: destination.highlights ? destination.highlights.join(', ') : '',
      best_time: destination.best_time || '',
      is_active: destination.is_active,
    });
    setImagePreview(destination.image_url || null);
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Error', description: 'Image must be less than 5MB', variant: 'destructive' });
      return;
    }

    setIsUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `destinations/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('destination-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      setIsUploading(false);
      return;
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/destination-images/${filePath}`;
    setFormData({ ...formData, image_url: publicUrl });
    setImagePreview(publicUrl);
    setIsUploading(false);
    toast({ title: 'Image uploaded successfully' });
  };

  const removeImage = () => {
    setFormData({ ...formData, image_url: '' });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      const result = await supabase
        .from('destinations')
        .update(payload)
        .eq('id', editingId);
      error = result.error;
    } else {
      const result = await supabase.from('destinations').insert(payload);
      error = result.error;
    }

    setIsSaving(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: editingId ? 'Destination updated' : 'Destination created' });
      setIsDialogOpen(false);
      fetchDestinations();
    }
  };

  const deleteDestination = async (id) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;

    const { error } = await supabase.from('destinations').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to delete destination', variant: 'destructive' });
    } else {
      toast({ title: 'Destination deleted' });
      setDestinations(destinations.filter((d) => d.id !== id));
    }
  };

  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase
      .from('destinations')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    } else {
      setDestinations(
        destinations.map((d) =>
          d.id === id ? { ...d, is_active: !currentStatus } : d
        )
      );
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
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Destinations</h1>
          <p className="text-muted-foreground">Manage tour destinations</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Destination
        </Button>
      </div>

      {/* LIST */}
      {destinations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No destinations yet</p>
            <Button onClick={openCreateDialog} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add your first destination
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className={!destination.is_active ? 'opacity-60' : ''}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{destination.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">/{destination.slug}</p>
                  </div>
                  <Switch
                    checked={destination.is_active}
                    onCheckedChange={() =>
                      toggleActive(destination.id, destination.is_active)
                    }
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(destination)}
                  >
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteDestination(destination.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* CREATE / EDIT DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Destination' : 'Add Destination'}</DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update destination details'
                : 'Create a new tour destination'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div className="space-y-2">
              <Label htmlFor="dest-name">Name *</Label>
              <Input
                id="dest-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: editingId
                      ? formData.slug
                      : generateSlug(e.target.value),
                  })
                }
                required
              />
            </div>

            {/* SLUG */}
            <div className="space-y-2">
              <Label htmlFor="dest-slug">URL Slug</Label>
              <Input
                id="dest-slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            {/* IMAGE */}
            <div className="space-y-2">
              <Label>Destination Image</Label>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">
                    {isUploading ? 'Uploading...' : 'Click to upload image'}
                  </p>
                  <p className="text-xs mt-1">Max 5MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </div>

            {/* HIGHLIGHTS */}
            <div className="space-y-2">
              <Label>Highlights (comma-separated)</Label>
              <Input
                value={formData.highlights}
                onChange={(e) =>
                  setFormData({ ...formData, highlights: e.target.value })
                }
              />
            </div>

            {/* BEST TIME */}
            <div className="space-y-2">
              <Label>Best Time to Visit</Label>
              <Input
                value={formData.best_time}
                onChange={(e) =>
                  setFormData({ ...formData, best_time: e.target.value })
                }
              />
            </div>

            {/* ACTIVE */}
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label>Active (visible on website)</Label>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsDialogOpen(false)}
              >
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
