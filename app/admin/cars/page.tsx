"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import { Plus, Pencil, Trash2 } from 'lucide-react';

type Car = {
  _id: string;
  title: string;
  description: string;
  pricePerDay: number;
  isAvailable: boolean;
  isFeatured: boolean;
  withDriver: boolean;
  fuelIncluded: boolean;
  images: string[];
};

export default function CarsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      toast.error('Failed to fetch cars');
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/cars', {
        method: editingCar ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingCar?._id,
          title: formData.get('title'),
          description: formData.get('description'),
          pricePerDay: Number(formData.get('pricePerDay')),
          isAvailable: formData.get('isAvailable') === 'true',
          isFeatured: formData.get('isFeatured') === 'true',
          withDriver: formData.get('withDriver') === 'true',
          fuelIncluded: formData.get('fuelIncluded') === 'true',
          images: formData.get('images')?.toString().split('\n').filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error(editingCar ? 'Failed to update car' : 'Failed to create car');

      await fetchCars();
      toast.success(editingCar ? 'Car updated successfully' : 'Car created successfully');
      setIsDialogOpen(false);
      setEditingCar(null);
    } catch (error) {
      toast.error(editingCar ? 'Failed to update car' : 'Failed to create car');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCar(id: string) {
    try {
      const response = await fetch('/api/cars', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete car');

      await fetchCars();
      toast.success('Car deleted successfully');
    } catch (error) {
      toast.error('Failed to delete car');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cars</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Car
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingCar?.title}
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
                  defaultValue={editingCar?.description}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pricePerDay" className="text-sm font-medium">
                  Price Per Day
                </label>
                <Input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  defaultValue={editingCar?.pricePerDay}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="images" className="text-sm font-medium">
                  Images (One URL per line)
                </label>
                <Textarea
                  id="images"
                  name="images"
                  defaultValue={editingCar?.images?.join('\n')}
                  required
                  disabled={isLoading}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isAvailable"
                    name="isAvailable"
                    defaultChecked={editingCar?.isAvailable ?? true}
                    value="true"
                  />
                  <label htmlFor="isAvailable" className="text-sm font-medium">
                    Available for Rent
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    name="isFeatured"
                    defaultChecked={editingCar?.isFeatured ?? false}
                    value="true"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium">
                    Featured Car
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="withDriver"
                    name="withDriver"
                    defaultChecked={editingCar?.withDriver ?? true}
                    value="true"
                  />
                  <label htmlFor="withDriver" className="text-sm font-medium">
                    With Driver
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="fuelIncluded"
                    name="fuelIncluded"
                    defaultChecked={editingCar?.fuelIncluded ?? false}
                    value="true"
                  />
                  <label htmlFor="fuelIncluded" className="text-sm font-medium">
                    Fuel Included
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (editingCar ? 'Updating...' : 'Creating...') : (editingCar ? 'Update Car' : 'Create Car')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price Per Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Fuel</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No cars found
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => (
                <TableRow key={car._id}>
                  <TableCell>{car.title}</TableCell>
                  <TableCell>PKR {car.pricePerDay.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      car.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {car.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {car.isFeatured ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {car.withDriver ? 'Included' : 'Not Included'}
                  </TableCell>
                  <TableCell>
                    {car.fuelIncluded ? 'Included' : 'Not Included'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setEditingCar(car);
                          setIsDialogOpen(true);
                        }}
                      >
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
                            <AlertDialogTitle>Delete Car</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this car? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCar(car._id)}
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