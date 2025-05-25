"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const commonFeatures = [
  "Mountain views",
  "River frontage",
  "Access road available",
  "Electricity connection",
  "Water supply",
  "Commercial zoning",
  "Residential zoning",
  "Near attractions",
  "Development ready",
  "High ROI potential",
  "Tourism potential",
  "Peaceful surroundings"
];

export default function PropertiesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  type Region = { _id: string; slug: string; title: string };
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  type Property = {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: string;
    area: string;
    region: string;
    features: string[];
    images: string[];
    isFeatured: boolean;
  };
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchRegions();
    fetchProperties();
  }, []);

  async function fetchRegions() {
    try {
      const response = await fetch('/api/regions');
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      toast.error('Failed to fetch regions');
    }
  }

  async function fetchProperties() {
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      toast.error('Failed to fetch properties');
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.get('title'),
          description: formData.get('description'),
          location: formData.get('location'),
          price: formData.get('price'),
          area: formData.get('area'),
          region: formData.get('region'),
          features: selectedFeatures,
          images: formData.get('images')?.toString().split('\n').filter(Boolean),
          isFeatured: formData.get('isFeatured') === 'true'
        }),
      });

      if (!response.ok) throw new Error('Failed to create property');

      await fetchProperties();
      toast.success('Property created successfully');
      setIsDialogOpen(false);
      setSelectedFeatures([]);
    } catch (error) {
      toast.error('Failed to create property');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProperty(id: string) {
    try {
      const response = await fetch('/api/properties', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete property');

      await fetchProperties();
      toast.success('Property deleted successfully');
      setPropertyToDelete(null);
    } catch (error) {
      toast.error('Failed to delete property');
    }
  }

  return (
    <div className="space-y-6 p-6 mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price
                  </label>
                  <Input
                    id="price"
                    name="price"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="area" className="text-sm font-medium">
                    Area
                  </label>
                  <Input
                    id="area"
                    name="area"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="region" className="text-sm font-medium">
                  Region
                </label>
                <Select name="region" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region._id} value={region.slug}>
                        {region.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <div className="grid grid-cols-2 gap-2 border rounded-lg p-4 max-h-48 overflow-y-auto">
                  {commonFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFeatures(prev => [...prev, feature]);
                          } else {
                            setSelectedFeatures(prev => prev.filter(f => f !== feature));
                          }
                        }}
                      />
                      <label htmlFor={feature} className="text-sm">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="images" className="text-sm font-medium">
                  Images (One URL per line)
                </label>
                <Textarea
                  id="images"
                  name="images"
                  required
                  disabled={isLoading}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Featured Property
                </label>
                <Select name="isFeatured" defaultValue="false">
                  <SelectTrigger>
                    <SelectValue placeholder="Is this a featured property?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Property'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No properties found
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.region}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Property</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this property? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProperty(property._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}