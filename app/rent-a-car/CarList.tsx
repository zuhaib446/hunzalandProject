"use client";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CarList({ cars }: { cars: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <Card key={car._id} className="overflow-hidden">
          <div className="aspect-video relative">
            <img 
              src={car.images[0]} 
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
            <p className="text-muted-foreground mb-4">{car.description}</p>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">
                PKR {car.pricePerDay.toLocaleString()} / day
              </p>
              <span className={`px-3 py-1 rounded-full text-sm ${
                car.isAvailable 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {car.isAvailable ? 'Available' : 'Not Available'}
              </span>
            </div>
            <Button 
              className="w-full"
              disabled={!car.isAvailable}
              onClick={() => window.open('https://wa.me/923468824466?text=I%20am%20interested%20in%20renting%20this%20car:%20' + car.title, '_blank')}
            >
              {car.isAvailable ? 'Book Now' : 'Not Available'}
            </Button>
          </div>
        </Card>
      ))}
      {cars.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-xl text-muted-foreground">No cars available at the moment.</p>
          <p className="mt-2 text-muted-foreground">Please check back later or contact us for custom requirements.</p>
        </div>
      )}
    </div>
  );
}