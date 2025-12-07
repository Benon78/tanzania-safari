import { Layout } from '@/components/layout/Layout';
import { destinations, tours } from '@/data/tours';

const Destinations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mb-4">
            Our Destinations
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            From the endless plains of the Serengeti to the spice-scented shores of Zanzibar,
            discover Tanzania's most spectacular locations.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-16">
            {destinations.map((destination, index) => {
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={destination.slug}
                  id={destination.slug}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Image */}
                  <div className={isReversed ? 'md:order-2' : ''}>
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full aspect-[4/3] object-cover rounded-xl shadow-elevated"
                    />
                  </div>

                  {/* Content */}
                  <div className={isReversed ? 'md:order-1' : ''}>
                    <h2 className="text-3xl font-heading font-semibold mb-4">
                      {destination.name}
                    </h2>

                    <p className="text-muted-foreground mb-2 leading-relaxed">
                      {destination.name === 'Serengeti' &&
                        "The Serengeti is Tanzania's most iconic destination, home to the Great Migration where over two million wildebeest, zebras, and gazelles traverse the endless plains. Experience unparalleled wildlife viewing with opportunities to spot all of the Big Five in their natural habitat."
                      }
                      {destination.name === 'Zanzibar' &&
                        "The exotic spice island of Zanzibar offers pristine white-sand beaches, crystal-clear waters, and the historic Stone Town UNESCO World Heritage Site. Dive into vibrant coral reefs, explore ancient spice plantations, and immerse yourself in Swahili culture."
                      }
                      {destination.name === 'Mikumi' &&
                        "Mikumi National Park is Tanzania's most accessible safari destination, offering excellent wildlife viewing just a few hours from Dar es Salaam. The Mkata Floodplain provides stunning backdrops for photography with lions, elephants, giraffes, and abundant birdlife."
                      }
                      {destination.name === 'Kilimanjaro' &&
                        "Mount Kilimanjaro, Africa's highest peak at 5,895 meters, offers trekkers the chance to summit the 'Roof of Africa.' From lush rainforests to alpine deserts and glacial peaks, experience diverse ecosystems on your journey to Uhuru Peak."
                      }
                      {destination.name === 'Tarangire' &&
                        "Tarangire National Park is famous for its massive elephant herds, ancient baobab trees, and the seasonal Tarangire River. During the dry season, wildlife congregates in extraordinary numbers, offering some of the best game viewing in northern Tanzania."
                      }
                      {destination.name === 'Nyerere' &&
                        "Nyerere National Park, formerly part of the Selous Game Reserve, is one of Africa’s largest protected areas. Known for its untouched wilderness, boat safaris, river wildlife, and vast landscapes, it's a perfect destination for those seeking a remote and authentic safari experience."
                      }
                      {destination.name === 'Mount Meru' &&
                        "Mount Meru is Tanzania’s second-highest mountain and one of East Africa’s most beautiful volcanic peaks. The trek offers lush forests, abundant wildlife, scenic ridges, and panoramic views of Mount Kilimanjaro from the summit."
                      }
                      {destination.name === 'Pugu Kazimzimbwe Forest' &&
                        "The Pugu Kazimzimbwe Forest Reserve is a serene escape just outside Dar es Salaam. Known for its caves, birdlife, rolling hills, and peaceful trails, it's perfect for day hikes, camping, and connecting with Tanzania’s natural beauty close to the city."
                      }
                      {destination.name === 'Ngorongoro' &&
                        "The Ngorongoro Crater is the world’s largest intact volcanic caldera and one of Africa’s most remarkable wildlife sanctuaries. With year-round water and grassland, it supports dense populations of lions, rhinos, elephants, buffalo, and hyenas."
                      }

                      {destination.name === 'Pemba Island' &&
                        "Pemba Island, the untouched sister of Zanzibar, offers lush forests, rolling hills, and world-class diving. Known for its rich Swahili culture and quiet, unspoiled beaches, it is the perfect destination for travelers seeking true tranquility."
                      }

                      {destination.name === 'Ruaha' &&
                        "Ruaha National Park is Tanzania’s largest park, famous for rugged landscapes, massive elephant herds, big prides of lions, and exceptional predator viewing. A remote wilderness ideal for authentic safari lovers."
                      }

                      {destination.name === 'Selous (Nyerere NP)' &&
                        "Nyerere National Park (formerly Selous) is one of Africa’s largest protected areas, offering river safaris, diverse wildlife, and lush wetlands. It is an excellent destination for elephants, lions, hippos, and wild dogs."
                      }                     
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{tours.filter(t => t.destinationSlug === destination.slug).length} tour{tours.filter(t => t.destinationSlug === destination.slug).length !== 1 ? 's' : ''} available</p>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {destination.name === 'Serengeti' && (
                        <>
                          <li>• Great Migration (July–October)</li>
                          <li>• Big Five wildlife viewing</li>
                          <li>• Hot air balloon safaris</li>
                          <li>• Luxury tented camps</li>
                        </>
                      )}

                      {destination.name === 'Zanzibar' && (
                        <>
                          <li>• Stone Town heritage walks</li>
                          <li>• Spice plantation tours</li>
                          <li>• Snorkeling & diving</li>
                          <li>• Beach resorts</li>
                        </>
                      )}

                      {destination.name === 'Mikumi' && (
                        <>
                          <li>• Close to Dar es Salaam</li>
                          <li>• Excellent for short safaris</li>
                          <li>• Lions & elephants</li>
                          <li>• Budget-friendly options</li>
                        </>
                      )}

                      {destination.name === 'Kilimanjaro' && (
                        <>
                          <li>• Multiple trekking routes</li>
                          <li>• No technical climbing required</li>
                          <li>• Day hikes available</li>
                          <li>• Experienced local guides</li>
                        </>
                      )}

                      {destination.name === 'Tarangire' && (
                        <>
                          <li>• Huge elephant herds</li>
                          <li>• Baobab-dotted landscapes</li>
                          <li>• Dry-season wildlife concentration</li>
                          <li>• Great photography opportunities</li>
                        </>
                      )}
                      
                      {destination.name === 'Nyerere' && (
                        <>
                          <li>• Boat safaris on Rufiji River</li>
                          <li>• Remote and wild</li>
                          <li>• High density of lions</li>
                          <li>• Game drives & walking safaris</li>
                        </>
                      )}

                      {destination.name === 'Mount Meru' && (
                        <>
                          <li>• Perfect acclimatization for Kilimanjaro</li>
                          <li>• Wildlife on lower slopes</li>
                          <li>• Crater rim climbing</li>
                          <li>• Stunning views of Kilimanjaro</li>
                        </>
                      )}

                      {destination.name === 'Pugu Kazimzimbwe Forest' && (
                        <>
                          <li>• Ideal for day hikes</li>
                          <li>• Birdwatching & nature trails</li>
                          <li>• Campsites available</li>
                          <li>• Close to Dar es Salaam</li>
                        </>
                      )}

                  {destination.name === 'Ngorongoro' && (
                    <>
                      <li>• Big Five in a compact area</li>
                      <li>• Black rhino sightings</li>
                      <li>• Crater viewpoints</li>
                      <li>• Ideal year-round wildlife density</li>
                    </>
                  )}

                  {destination.name === 'Pemba Island' && (
                    <>
                      <li>• Unspoiled beaches</li>
                      <li>• Coral reefs & deep-sea diving</li>
                      <li>• Swahili cultural heritage</li>
                      <li>• Peaceful & less crowded</li>
                    </>
                  )}

                  {destination.name === 'Ruaha' && (
                    <>
                      <li>• Largest national park in Tanzania</li>
                      <li>• Huge elephant population</li>
                      <li>• Excellent predator sightings</li>
                      <li>• Remote wilderness experience</li>
                    </>
                  )}

                  {destination.name === 'Selous (Nyerere NP)' && (
                    <>
                      <li>• River boat safaris</li>
                      <li>• Hippos, crocodiles & lions</li>
                      <li>• Wild dogs sightings</li>
                      <li>• Massive untouched landscapes</li>
                    </>
                  )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;
