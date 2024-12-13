import {UserRoundCheck, Database, Zap } from 'lucide-react';
import { SearchForm } from '@/components/search-form';
import FeatureCard from '@/components/ui/feature-card';
import { ImageCarousel } from '@/components/ui/image-carousel';

const carouselImages = [
  { src: "/example-mileage-graph.png?height=200&width=800", alt: "Car image 1" },
  { src: "/example-vehicle-infos.png?height=200&width=800", alt: "Car image 2" },
  { src: "/example-view-mot-history.png?height=200&width=800", alt: "Car image 4" },
]


export default function HomePage() {
  return (
    <main>
      <section className="pt-10 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-4">
            <div className="text-center lg:text-left lg:col-span-2 md:pr-10">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                Buying a Car?
                <span className="block text-orange-500">Check it first</span>
              </h1>
              <p className="mt-3 text-gray-500">
                Enter your registration  Enter your registration  Enter your registration  Enter your registration  Enter your registration
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2 md:pt-10">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white w-full ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 justify-center">
        <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl block text-orange-500">
                Example Report
              </h1>
              </div>
        <ImageCarousel images={carouselImages} />
        
      </section>
      


      <section className="py-10  w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="text-center text-2xl font-bold pb-10 sm:text-2xl md:text-3xl">
            Why Use Our Free Vehicle Checker?
          </h1>

          <div className="mx-auto lg:grid lg:grid-cols-3 lg:gap-8">
            <FeatureCard
              icon={<Zap />}
              title='Free Instant Results'
              description='Get comprehensive free vehicle information in seconds.'
            />

            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title='Official Data'
              description='We use the latest data from the DVLA database.'
            />

            <FeatureCard
              icon={<UserRoundCheck />}
              title='Easy to Use'
              description='Simple interface for quick and efficient checks.'
            />

          </div>
        </div>
      </section>


    </main>
  );
}

