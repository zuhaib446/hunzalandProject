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
              className="w-full mb-2"
              variant="default"
              onClick={() => window.location.href = `/rent-a-car/${car._id}`}
            >
              View Details
            </Button>
            <Button
              className="w-full flex items-center justify-center gap-2 font-semibold"
              style={{
                backgroundColor: car.isAvailable ? '#25D366' : undefined,
                color: car.isAvailable ? 'white' : undefined,
                opacity: car.isAvailable ? 1 : 0.6,
                cursor: car.isAvailable ? 'pointer' : 'not-allowed',
              }}
              disabled={!car.isAvailable}
              onClick={() =>
                window.open(
                  'https://wa.me/923468824466?text=I%20am%20interested%20in%20renting%20this%20car:%20' + car.title,
                  '_blank'
                )
              }
            >
              {/* WhatsApp SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path
                  d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.385L4 29l7.828-2.049C13.416 27.168 14.684 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.168 0-2.312-.168-3.393-.496l-.242-.072-4.393 1.15 1.176-4.285-.158-.244C7.168 19.312 7 18.168 7 17c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.293-7.707c-.293-.293-.768-.293-1.061 0l-1.293 1.293c-.293.293-.293.768 0 1.061.293.293.768.293 1.061 0l1.293-1.293c.293-.293.293-.768 0-1.061zm-7.586 0c-.293.293-.293.768 0 1.061l1.293 1.293c.293.293.768.293 1.061 0 .293-.293.293-.768 0-1.061l-1.293-1.293c-.293-.293-.768-.293-1.061 0z"
                  fill="#fff"
                />
              </svg>
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