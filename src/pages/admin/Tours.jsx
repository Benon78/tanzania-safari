import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { usePageTittle } from '@/hooks/usePageTittle';
import { Plus, Pencil, Trash2, Upload, X, Eye, EyeOff, Mail  } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

const categories = [
  { id: 'safari', name: 'Safari Tours' },
  { id: 'beach', name: 'Zanzibar & Beach' },
  { id: 'day-trip', name: 'Day Trips' },
  { id: 'cultural', name: 'Cultural Tours' },
  { id: 'adventure', name: 'Adventure & Trekking' },
];

const categoryColors = {
  safari: "bg-primary text-primary-foreground",
  beach: "bg-blue-500 text-white",
  "day-trip": "bg-amber-500 text-white",
  cultural: "bg-purple-500 text-white", 
  adventure: "bg-orange-500 text-white",
};

export default function ToursAdmin() {
  usePageTittle()
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sendNewsletter, setSendNewsletter] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'safari',
    duration: '',
    price: '',
    short_description: '',
    highlights: '',
    inclusions: '',
    exclusions: '',
    itinerary: [],
    is_active: true,
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching tours', description: error.message, variant: 'destructive' });
    } else {
      setTours(data || []);
    }
    setIsLoading(false);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const openCreateDialog = () => {
    setEditingTour(null);
    setFormData({
      title: '',
      slug: '',
      category: 'safari',
      duration: '',
      price: '',
      short_description: '',
      highlights: '',
      inclusions: '',
      exclusions: '',
      itinerary: [],
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setSendNewsletter(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      slug: tour.slug,
      category: tour.category,
      duration: tour.duration,
      price: tour.price != null ? String(tour.price) : '',
      short_description: tour.short_description || '',
      highlights: (tour.highlights && Array.isArray(tour.highlights)) ? tour.highlights.join('\n') : '',
      inclusions: (tour.inclusions && Array.isArray(tour.inclusions)) ? tour.inclusions.join('\n') : '',
      exclusions: (tour.exclusions && Array.isArray(tour.exclusions)) ? tour.exclusions.join('\n') : '',
      itinerary: tour.itinerary || [],
      is_active: !!tour.is_active,
    });
    setImageFile(null);
    setImagePreview(tour.image_url || null);
    setGalleryFiles([]);
    setGalleryPreviews(tour.gallery || []);
    setSendNewsletter(false);
    setIsDialogOpen(true);
  };

  // Main tour image
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Gallery images
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    const previews = files.map(f => URL.createObjectURL(f));
    setGalleryPreviews(previews);
  };

  const removeGalleryImage = (index) => {
    const updatedFiles = [...galleryFiles];
    const updatedPreviews = [...galleryPreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setGalleryFiles(updatedFiles);
    setGalleryPreviews(updatedPreviews);
  };

  // Itinerary functions
  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }],
    }));
  };

  const updateItineraryDay = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, itinerary: updated }));
  };

  const removeItineraryDay = (index) => {
    const updated = [...formData.itinerary];
    updated.splice(index, 1);
    updated.forEach((item, i) => item.day = i + 1);
    setFormData(prev => ({ ...prev, itinerary: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    let imageUrl = editingTour?.image_url || null;
    let galleryUrls = editingTour?.gallery || [];

    // Upload main image
    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `tours/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('destination-images').upload(filePath, imageFile);
        if (uploadError) throw uploadError;
        const { data: publicUrl } = supabase.storage.from('destination-images').getPublicUrl(filePath);
        imageUrl = publicUrl.publicUrl;
      } catch (err) {
        toast({ title: 'Image upload failed', description: err.message || String(err), variant: 'destructive' });
        setIsSaving(false);
        return;
      }
    }

    // Upload gallery images
    if (galleryFiles.length > 0) {
      try {
        const uploadedUrls = [];
        for (let file of galleryFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = `tours/gallery/${fileName}`;
          const { error: uploadError } = await supabase.storage.from('destination-images').upload(filePath, file);
          if (uploadError) throw uploadError;
          const { data: publicUrl } = supabase.storage.from('destination-images').getPublicUrl(filePath);
          uploadedUrls.push(publicUrl.publicUrl);
        }
        galleryUrls = [...galleryUrls, ...uploadedUrls];
      } catch (err) {
        toast({ title: 'Gallery upload failed', description: err.message || String(err), variant: 'destructive' });
        setIsSaving(false);
        return;
      }
    }

    const tourData = {
      title: (formData.title || '').trim(),
      slug: formData.slug || generateSlug(formData.title || ''),
      category: formData.category,
      duration: (formData.duration || '').trim(),
      price: parseFloat(formData.price) || 0,
      short_description: (formData.short_description || '').trim() || null,
      highlights: (formData.highlights || '').split('\n').map(h => h.trim()).filter(Boolean),
      inclusions: (formData.inclusions || '').split('\n').map(i => i.trim()).filter(Boolean),
      exclusions: (formData.exclusions || '').split('\n').map(x => x.trim()).filter(Boolean),
      image_url: imageUrl,
      gallery: galleryUrls,
      itinerary: formData.itinerary,
      is_active: !!formData.is_active,
    };

    try {
      let error = null;
      const isCreating = !editingTour;
      if (editingTour) {
        const res = await supabase.from('tours').update(tourData).eq('id', editingTour.id);
        error = res.error;
      } else {
        const res = await supabase.from('tours').insert(tourData);
        error = res.error;
      }

      if (error) {
        toast({ title: 'Error saving tour', description: error.message, variant: 'destructive' });
        setIsSaving(false);
        return
      }

      // Send newsletter notification for new active tours
    if (isCreating && formData.is_active && sendNewsletter) {
      try {
        await supabase.functions.invoke('send-newsletter', {
          body: {
            tourTitle: tourData.title,
            tourSlug: tourData.slug,
            tourDescription: tourData.short_description || 'Check out our exciting new tour!',
            tourPrice: tourData.price,
            tourDuration: tourData.duration,
            tourImage: tourData.image_url,
          },
        });
        toast({ title: 'Newsletter sent to subscribers!' });
      } catch (newsletterError) {
        console.error('Newsletter notification failed:', newsletterError);
      }
    }

    setIsSaving(false);
    toast({ title: editingTour ? 'Tour updated' : 'Tour created' });
    setIsDialogOpen(false);
    fetchTours();

    } catch (err) {
      setIsSaving(false);
      toast({ title: 'Error saving tour', description: err.message || String(err), variant: 'destructive' });
    }
  };

  // Delete tour
  const deleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) toast({ title: 'Error deleting tour', description: error.message, variant: 'destructive' });
    else fetchTours();
  };

  // Toggle active
  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase.from('tours').update({ is_active: !currentStatus }).eq('id', id);
    if (error) toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
    else fetchTours();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tours</h1>
          <p className="text-muted-foreground">Manage tour packages</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Tour
        </Button>
      </div>

      {/* Tours Grid */}
      {tours.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No tours yet</p>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Tour
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Card key={tour.id} className={!tour.is_active ? 'opacity-60' : ''}>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                {tour.image_url ? (
                  <img src={tour.image_url} alt={tour.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={cn("px-2 py-1 text-xs rounded",categoryColors[tour.category])}>
                    {categories.find(c => c.id === tour.category)?.name || tour.category}
                  </span> 
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="truncate">{tour.title}</span>
                  <span className="text-primary font-bold">${tour.price}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{tour.duration}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{tour.short_description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(tour)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteTour(tour.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleActive(tour.id, tour.is_active)}>
                    {tour.is_active ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTour ? 'Edit Tour' : 'Add New Tour'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title & Slug */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated"
                />
              </div>
            </div>

            {/* Category / Duration / Price */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input id="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required placeholder="e.g. 3 Days / 2 Nights" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              </div>
            </div>

            {/* Main Image */}
            <div className="space-y-2">
              <Label>Tour Image</Label>
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeImage}><X className="h-4 w-4" /></Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {/* Gallery */}
              <div className="space-y-2">
              <Label>Gallery Images</Label>
              <div className="flex flex-wrap gap-2">
              {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative w-24 h-24 rounded overflow-hidden">
                    <img src={preview} className="w-full h-full object-cover" alt="Gallery preview" />
                    <Button type="button" size="icon" variant="destructive" className="absolute top-1 right-1 p-1" onClick={() => removeGalleryImage(index)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-border rounded cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} />
                </label>
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} rows={3} />
            </div>

            {/* Highlights / Inclusions / Exclusions */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Highlights</Label>
                <Textarea value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} rows={3} placeholder="One per line" />
              </div>
              <div className="space-y-2">
                <Label>Inclusions</Label>
                <Textarea value={formData.inclusions} onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })} rows={3} placeholder="One per line" />
              </div>
              <div className="space-y-2">
                <Label>Exclusions</Label>
                <Textarea value={formData.exclusions} onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })} rows={3} placeholder="One per line" />
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-2">
              <Label>Itinerary</Label>
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border p-2 rounded space-y-2 relative">
                  <span className="absolute top-2 right-2 text-xs text-muted-foreground cursor-pointer" onClick={() => removeItineraryDay(index)}>Remove</span>
                  <Input placeholder={`Day ${day.day} Title`} value={day.title} onChange={(e) => updateItineraryDay(index, 'title', e.target.value)} />
                  <Textarea placeholder={`Day ${day.day} Description`} value={day.description} onChange={(e) => updateItineraryDay(index, 'description', e.target.value)} rows={2} />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addItineraryDay}>Add Day</Button>
            </div>

            {/* Active Switch */}
            <div className="flex items-center space-x-2">
              <Switch id='is_active' checked={formData.is_active} onCheckedChange={(val) => setFormData({ ...formData, is_active: val })} />
              <Label htmlFor="is_active">Active (visible on website)</Label>
            </div>

            {!editingTour && formData.is_active && (
              <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Checkbox
                  id="send_newsletter"
                  checked={sendNewsletter}
                  onCheckedChange={(checked) => setSendNewsletter(checked === true)}
                />
                <div className="flex-1">
                  <Label htmlFor="send_newsletter" className="flex items-center gap-2 cursor-pointer">
                    <Mail className="h-4 w-4 text-primary" />
                    Notify newsletter subscribers
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Send an email to all subscribers about this new tour
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Tour'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
