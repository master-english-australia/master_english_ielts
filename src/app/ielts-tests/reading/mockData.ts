export const readingTests = {
  test_id: "ielts_reading_mock_01",
  title: "IELTS Reading Mock Test",
  time_limit: 60,
  parts: [
    {
      id: "section_1",
      title: "The History of Ice Cream",
      content_html: `<div id="ielts-reading-transcript-1" class="ielts-reading-transcript current">
        <p>==== Read the text below and answer questions 1-7 ====</p>
        <p><strong>The best ice cream makers</strong></p>
        <p>Have you ever considered making ice cream at home but thought it would be too complicated? Here is a selection of machines that could change your mind</p>
        <p><strong>A Magimix Gelato Expert</strong><br/>If you're an ice cream fanatic, it doesn't get better than this. It's quick, taking as little as 20 minutes, and consistent in its results, while the three automated programmes are very easy to use and it has an unusually generous two-litre capacity. On the other hand, we found it noisier than many, and the ice cream is softer than we might have liked.</p>
        <p><strong>B Shake n Make Ice Cream Maker</strong><br/>If you want to make some basic soft ice cream, this is a fun little gadget that gets decent results. You add a little ice and salt to the base, then your ingredients to the stainless-steel tub, pop the lid on and give it a good shake for at least three minutes. Provided you measure everything exactly and shake back and forth consistently, it's surprisingly efficient.</p>
        <p><strong>C Sage Smart Scoop</strong><br/>This is a seriously smart machine. Our favourite feature is the built-in sensor that works out whether the consistency of your ice cream or frozen yoghurt is right for you (from the 12 hardness settings) so that it can stop mixing when it's ready, alerting you with a fun tune. As you'd expect from the considerable price tag, there's a built-in freezer and it feels beautifully engineered.</p>
        <p><strong>D Lakeland Digital Ice Cream Maker</strong><br/>You simply pop on the lid and pour in the ingredients, then set the timer using the nice, clear digital display. Some customers reportedly struggled to disassemble it in order to wash the bowl and paddle, but we didn't have that problem. We're also giving it extra points for the recipe book, which has some really tasty ideas.</p>
        <p><strong>E Judge Ice Cream Maker</strong><br/>We had a few criticisms, perhaps not surprisingly when you consider this is one of the cheapest models in our selection – notably the fact that the paddle isn't as robust as the ones in other models. We'd have liked more recipes, too. But, for a budget machine, this is a bargain.</p>
        <p><strong>F KitchenAid Artisan Ice Cream Maker</strong><br/>If you own a KitchenAid food mixer, this attachment (one of 15 that fits this machine) is a good way to start ice cream making. You simply freeze the bowl before use and attach it to the mixer (a quick and easy job) and pour in your favourite fresh ingredients, with some recipes taking just 20 minutes.</p>
        <p></p>
        <p>==== Read the text below and answer Questions 8-14 ====</p>
        <p><strong>Photography weekend course on the coast of Cornwall</strong></p>
        <p>Our three-night photography weekend is designed to appeal to all levels. Participants will be able to enjoy some of the fantastic locations on this beautiful coastline, with its ever-changing light, while staying in a comfortable hotel and enjoying some typical dishes of this south-western region of Britain.</p>
        <p>Price includes: Personal daily tuition, discussions, welcome reception, and dinner, bed and breakfast for three nights in a twin or double room.</p>
        <p>Price does not include: Insurance and photographic equipment plus transport to photographic venues. Participants are required to arrange this. Car share during the weekend is a popular option.</p>
        <p><strong>Course information</strong><br/>
        • Our courses are relaxed but comprehensive, and the content is largely dictated by those attending. Included within the sessions are editing workshops at the hotel and photo shoots down by the sea. Visits further away are also undertaken to experiment with different landscapes.<br/>
        • Arrival by mid-afternoon on the first day will allow you to check into the hotel and enjoy some Cornish refreshments before heading out into the fresh air for our first shoot together at sunset. Dinner and a good night's sleep and you'll be ready to start at sunrise the next day. In the evenings you will have a chance to unwind at the hotel, share your thoughts on the day and spend time looking at images and sharing editing techniques.<br/>
        • Maximum numbers: Four photographers per course.<br/>
        • The following equipment is essential: A digital SLR or bridge camera with its instruction manual, batteries and charger; memory cards; comfortable walking footwear with good grip; warm outdoor clothing and waterproofs.<br/>
        • Recommended equipment: A tripod, filters, a laptop with editing software and charger.</p>
        </div>`,
      instruction:
        "This is a mock test for the IELTS Reading section. It is designed to help you practice your reading skills and prepare for the real test.",
      question_groups: [
        {
          id: "group_1",
          instruction:
            "Look at the advertisements for ice-cream makers A–F. For which ice-cream maker are the following statements true?",
          questionType: "matching",
          questions: [
            {
              id: "1",
              questionText:
                "Users of this machine will need to put some physical effort into making ice cream.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "B",
            },
            {
              id: "2",
              questionText:
                "This machine can be fitted onto an existing kitchen appliance.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "F",
            },
            {
              id: "3",
              questionText:
                "This machine is the most expensive in the selection.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "A",
            },
            {
              id: "4",
              questionText:
                "This machine is the most expensive in the selection.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "A",
            },
            {
              id: "5",
              questionText:
                "This machine is the most expensive in the selection.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "A",
            },
            {
              id: "6",
              questionText:
                "This machine is the most expensive in the selection.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "A",
            },
            {
              id: "7",
              questionText:
                "This machine is the most expensive in the selection.",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "A",
            },
          ],
        },
        {
          id: "group_2",
          instruction:
            "Do the following statements agree with the information given in the text?",
          questionType: "true_false_not_given",
          questions: [
            {
              id: "8",
              questionText:
                "Ice cream makers were first invented in the 20th century.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "FALSE",
            },
            {
              id: "9",
              questionText:
                "People found it difficult to clean older ice cream makers.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "TRUE",
            },
            {
              id: "10",
              questionText:
                "Modern ice cream makers are only suitable for professional use.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "FALSE",
            },
            {
              id: "11",
              questionText:
                "Modern ice cream makers are only suitable for professional use.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "FALSE",
            },
            {
              id: "12",
              questionText:
                "Modern ice cream makers are only suitable for professional use.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "FALSE",
            },
            {
              id: "13",
              questionText:
                "Modern ice cream makers are only suitable for professional use.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "FALSE",
            },
            {
              id: "14",
              questionText:
                "Modern ice cream makers are only suitable for professional use.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correct_answer: "FALSE",
            },
          ],
        },
      ],
    },
    {
      id: "section_2",
      title: "Photography Weekend Course",
      content_html: `<div id="ielts-reading-transcript-2" class="ielts-reading-transcript current">
      <p>==== Read the text below and answer Questions 15-21 ====</p>
      <p><strong>Respiratory Protective Equipment – advice for factory employees</strong></p>
      <p>You need to wear Respiratory Protective Equipment (RPE) when you're doing work where you could breathe in hazardous substances in the air such as dust, vapour or gas. Common health effects from breathing hazardous substances include sore eyes and headaches. Make sure you are using the right RPE for the task. For example, negative pressure respirators should not be used in low oxygen environments.</p>
      <p>Some types of RPE must have a tight seal around the facial area to be effective. Your employer will arrange a yearly facial fit test to ensure that you are given RPE that fits properly. This checks that the seal between the respirator and the facial area is secure, by releasing a substance that you can smell or taste if the RPE is not working properly. RPE will only provide effective protection if you are clean shaven. Facial hair growth makes it almost impossible to get a good seal so, if you have a beard, you should talk to your employer about other forms of RPE that do not rely on a tight facial fit. Jewellery and long hair can also compromise an effective fit.</p>
      <p><strong>Using your RPE</strong><br/>You should complete a visual check of your RPE for signs of damage before you use it. If you are using RPE that requires a tight fit, you must check it fits properly before entering a hazardous area.</p>
      <p><strong>Cleaning your RPE</strong><br/>Wash and dry your RPE after using it. Use a mild detergent, as harsh products such as solvents can cause damage. Use a brush and warm water and rinse with clean water. This will remove excess detergent that can cause skin irritation. Dry your RPE on a solid wooden rack or suspend from a clothes line.</p>
      <p><strong>Maintaining your RPE</strong><br/>Inspect your RPE after each use and during cleaning. Make sure you check the straps for breaks, tears, fraying edges and deterioration of elasticity. Check the inhalation and exhalation valves are working and not damaged.</p>
      <p><strong>Storing your RPE</strong><br/>Improper storage can cause distortion to your RPE. Store your RPE in a clean, dry place, away from dust, oil and sunlight. RPE should be stored so that it doesn't get crushed.</p>
      <p></p>
      <p>==== Read the text below and answer Questions 22-27 ====</p>
      <p><strong>Working with cows in a dairy Guidelines for employers</strong></p>
      <p><strong>Slips and trips</strong><br/>Slips and trips are one of the most common accidents when working in farm dairies. They often happen when working with cows in a dairy during milking, and during maintenance and cleaning.</p>
      <p>The following three hazards make it more likely that employees will slip or trip:<br/>
      1. Surfaces which are wet or dirty<br/>
      • Have a system for cleaning up milk, oil, cleaning fluid and grain spills as soon as it happen, and make sure it is followed.<br/>
      • Install non-slip mats in wet work areas and make sure that footwear is slip-resistant.</p>
      <p>2. Obstacles such as pipes or cables in the farm dairy<br/>
      • Reduce tripping accidents by hanging hoses and pipes along walls out of people's way and remove unused fittings, like bolt fasteners in floors.<br/>
      • Move obstacles from walkways and entrances where possible. Tripping hazards which cannot be removed should be clearly indicated with yellow tape. If there are obstacles overhead, these should be wrapped in padding to avoid risk of injury.</p>
      <p>3. Steps which are too high or not deep enough, or steps in poorly lit areas<br/>
      • Build steps properly and use non-slip surfaces.<br/>
      • Handrails should also be fitted.<br/>
      • The provision of good lighting can also help to reduce the risk of injury.</p>
      <p><strong>Lifting and carrying</strong><br/>The following tasks pose risks to dairy workers:<br/>
      • lifting buckets of grain, water and milk<br/>
      • lifting calves.</p>
      <p><strong>Managing the hazards</strong><br/>
      • Balance the load by using two buckets, one in each hand.<br/>
      • Where possible, use trolleys and other mechanical aids to replace manual tasks.</p>
      <p><strong>Milking by hand</strong><br/>Specific tasks in milking which cause injury are:<br/>
      • bending in an awkward position<br/>
      • putting on and removing milking equipment from cows.</p>
      <p><strong>Managing the hazards</strong><br/>
      • Think about designing or changing the milking area so workers can change the height they are working at to suit them. Ensure that all equipment needed is close by to avoid workers having to overreach or adopt a bending position.<br/>
      • Alternate between jobs to reduce repetitious manual handling tasks, including a rotation between putting on and removing milking equipment.</p>
    </div>
    <div id="ielts-reading-transcript-3" class="ielts-reading-transcript">
      <p>==== Read the text below and answer Questions 28-40 ====</p>
      <p><strong>Night photography in autumn</strong></p>
      <p><strong>A</strong> November in the northern hemisphere is not the most inspiring of months for the photographer. The days shorten appreciably as winter approaches and the last autumn leaves are blown free by high winds and frequent rain. Nature seems dormant, as many birds have long since flown to warmer climates, fungi break through the earth, and many animal species sleep until spring's warm awakening.</p>
      <p>It would seem a good time also to put the camera to bed and forget about photography until the first snowfall. Well, not quite. With the days being shorter and daylight less bright, November is an excellent month to turn your attention to what can be found in the long darkness from dusk to dawn. In the nocturnal hours a vast number of life forms still thrive, and provide a completely different set of subjects to those the daylight hours present.</p>
      <p><strong>B</strong> As the most noticeable object in the night sky, the moon is an obvious subject when making your initial attempts at night photography. The timing of an evening moonrise is important to know because, not only does it vary according to the time of year, but the moon always appears largest at this point, when it is closest to the horizon. To capture the moon at its brilliant best, you need a bit of luck too: a time when its brightest phase – a full moon – coincides with the ideal weather forecast of a cloudless night sky. The moon is not a direct light source such as the sun or the stars; instead it is reflecting the light of the sun hitting its surface. On such a night, a full moon will reflect only about ten percent of the sunlight, but that is still enough to illuminate buildings, trees, bridges and other landscape features.</p>
      <p><strong>C</strong> With today's cameras, far greater detail can be rendered. Whole constellations consisting of thousands of points of starlight filling the frame and even galaxies such as our own Milky Way can be captured. This is a type of night photography for which few of us had suitable equipment a decade ago, but now it has become accessible to all photographers, thanks to the much improved, affordable technology.</p>
      <p>However, photographers choosing to shoot the moon may be less concerned by this, as they tend to prefer to use telephoto lenses to magnify the size of the moon, particularly when it is low in the sky and can be shown in relation to a landmark or recognisable structure within the frame.</p>
      <p><strong>D</strong> Of course, the nocturnal world offers other subjects closer to the ground, some that are even familiar to us by day. As cities and towns spread further into our green spaces, some wild animals move further afield to escape our intrusions, while others adapt to their new urbanised surroundings.</p>
      <p>In European cities, sightings of foxes at night are increasingly common, as they thrive thanks to the cover of darkness and a ready supply of residents' waste bins, which they use as feeding stations. Deer and wild boar are larger mammals that have also adapted to the urban fringes in recent years, emerging from the cover of parks and nearby forests to forage into residential gardens by night.</p>
      <p><strong>E</strong> Such is the proliferation of urban wildlife that some photographers now specialise in documenting the nocturnal animals that have developed a taste for city nightlife. The improvement in camera technology that has made night sky images more accessible has also extended the creative repertoire of the wildlife photographer. It is now possible to photograph some wild species at night, or soon after dusk, without having to always resort to the use of specialist equipment. More exciting still is how the techniques of astro-photography and the wildlife camera-trap have combined in recent years, to produce images of nocturnal animals against a background of a star-studded night sky. This marriage of two photographic genres has created an innovative style of night photography.</p>
      <p><strong>F</strong> If that all sounds a bit too complex and time-consuming, with too many variables to spoil the hoped-for result, then consider using the fading light of the night sky in the brief time after dusk in a more opportunistic manner. Dusk is the part of the nocturnal phase when the light of the sun is still visible, though the sun itself has disappeared completely. During the earliest phase of dusk there is enough ambient light remaining to enable features in our surroundings to be seen without the aid of artificial light sources such as floodlights or street lamps.</p>
      <p><strong>G</strong> While many of us shoot sunsets, the period of dusk also provides an opportunity to use the ambient light low in the sky as a backdrop to photographing foreground subjects in varying stages of illumination, or even as shadowy outlines against the fading sky. The variety of possible subjects includes ships at sea, flocks of low-flying birds, trees, windmills, skyscrapers and high bridges. These are all well known by day, but against a night sky at dusk they lack colour, so any compositional strength is determined by the graphic appeal of their distinct and recognisable shapes.</p>
    </div>
  </div>`,
      instruction:
        "This is a mock test for the IELTS Reading section. It is designed to help you practice your reading skills and prepare for the real test.",
      question_groups: [
        {
          id: "group_4",
          instruction:
            "<p>Complete the sentences below. Choose <strong>ONE WORD ONLY</strong> from the text for each answer.",
          questionType: "text_input",
          questionText: `<li>Parking is limited, so the use of alternative methods of transport and the ______ of cars is encouraged.</li><li>Staff with the highest ______ are given parking spaces first.</li><li>Some parking spaces are reserved for company vehicles during the ______ but may be used by staff at other times.</li><li>If an employee leaves the company permanently, their parking space will normally be given to their ______</li><li>If an employee takes extended leave, their parking space will be given to the person who provides ______ for the absent employee.</li><li>All ______ about car parking should be sent to the HR Manager.</li>`,
          questions: [
            {
              id: "15",
              correct_answer: "parking",
            },
            {
              id: "16",
              correct_answer: "highest",
            },
            {
              id: "17",
              correct_answer: "weekend",
            },
            {
              id: "18",
              correct_answer: "replacement",
            },
            {
              id: "19",
              correct_answer: "replacement",
            },
            {
              id: "20",
              correct_answer: "HR Manager",
            },
          ],
        },
        {
          id: "group_5",
          instruction:
            "<p>Complete the sentences below. Choose <strong>ONE WORD ONLY</strong> from the text for each answer.</p>",
          questionType: "text_input",
          questionText: `
<p><strong>Making sure offices are safe</strong></p>
<p><strong>To prevent slips, trips, falls and collisions, ensure that</strong><br>
• boxes, files, etc. are correctly stored<br>
• items such as ______ do not create a tripping hazard<br>
• workers do not use ______ to reach high object<br>
• ______ are fixed at corners<br>
• floors are covered by ______ especially at entrances</p>
<p><strong>To prevent injuries caused by objects, ensure that</strong><br>
• ______ in office furniture are kept closed<br>
• objects which are heavy are kept near the floor</p>
<p><strong>To prevent injuries due to posture and repetitive movement ensure that</strong><br>
• office furniture is ______<br>
• ______ are provided for documents<br>
• the mouse is placed next to the computer keyboard</p>
          `,
          questions: [
            {
              id: "21",
              correct_answer: "parking",
            },
            {
              id: "22",
              correct_answer: "highest",
            },
            {
              id: "23",
              correct_answer: "weekend",
            },
            {
              id: "24",
              correct_answer: "replacement",
            },
            {
              id: "25",
              correct_answer: "replacement",
            },
            {
              id: "26",
              correct_answer: "HR Manager",
            },
            {
              id: "27",
              correct_answer: "HR Manager",
            },
          ],
        },
      ],
    },
    {
      id: "section_3",
      title: "Photography Weekend Course",
      content_html: `<div id="ielts-reading-transcript-3" class="ielts-reading-transcript current"><p>==== Read the text below and answer questions 28-40 ====</p>
<p><strong>Roman Roads</strong></p>
<p><strong>A</strong> The long straight roads built by the Romans have in many cases become just as famous in history as their greatest emperors and generals. Building upon more ancient routes and creating a huge number of new ones Roman engineers were fearless in their plans to join one point to another in as straight line as possible whatever the difficulties in geography and the costs in manpower. Consequently roads required bridges tunnels, viaducts and many other architectural and engineering features to create a series of breathtaking but highly useful monuments which spread from Europe to eastern parts of the Roman Empire.</p>
<p><strong>B</strong> The Romans did not invent roads, but as in so many other areas, they took an idea which went back as far as the Bronze Age and extended that concept daring to squeeze from it the fullest possible potential. The first and most famous great Roman road was the Via Appia or Appian Way. Constructed from 312 BCE and covering 196 kilometers it linked Rome to ancient Capua in Italy in as straight a line as possible and was appropriately known to the Romans as the Regina Viarum or ‘Queen of Roads’. Much like a modern highway it bypassed small towns along the way and it largely ignored geographical obstacles. The road would later be extended to 569 kilometers in length.</p>
<p><strong>C</strong> The network of public Roman roads covered over 120,000 kilometers. Besides permitting the rapid deployment of troops and more importantly the wheeled vehicles which supplied them with food and equipment, Roman roads allowed for an increase in trade and cultural exchange. Roads were also one of the ways Rome could demonstrate its authority. For this reason, many roads began and ended in a triumphal arch, and the imperial prestige associated with a road project was demonstrated in the fact that roads were very often named after the officials who funded them; for example, the Via Appia takes its name from the Roman magistrate Appius Claudius Caecus.</p>
<p><strong>D</strong> To achieve the objective of constructing the shortest routes possible between two points, all manner of engineering difficulties had to be overcome. Once extensive surveying had been carried out, to ensure the proposed route was actually straight and to determine what various engineering methods were needed, marshes had to be drained, forests cut through, creeks diverted, bedrock channelled, mountainsides cut into rivers crossed with bridges, valleys traversed with viaducts and tunnels built through mountains. When all that was done, roads had to be levelled, reinforced with support walls or terracing and then, of course, maintained which they were for over 800 years.</p>
<p><strong>E</strong> Major roads were around a standard 4.2 metres wide, which was enough space for two vehicles to pass each other. First a trench was dug in the earth, and a layer of large stones was used to form the foundation. This was followed by a substantial deposit of smaller broken materials – often crushed brick was used for this purpose, and on top of this, a layer of fine gravel was added. This upper section of the road was referred to as the nucleus and was then surfaced with blocks or slabs. Mountain roads might also have ridges running across the surface of the slabs, to give animals better grip, and have ruts cut into the stone to guide wheeled vehicles.</p>
<p>Roads were purposely inclined slightly from the centre down to the kerb to allow rainwater to run off along the sides. Many also had parallel ditches that collected the runoff and formed a drainage canal on each side of the road. A path of packed gravel for pedestrians typically ran along each side of the road, varying in width from 1 to 3 metres. Separating the path from the road were the kerb stones, which were regular upright slabs. Busier stretches of main roads had areas where vehicles could pull over, and some of these had services for travellers and their animals. Milestones were also set up at regular intervals along the road and these often recorded who was responsible for the upkeep of that stretch of the road and what repairs had been made.</p>
<p><strong>F</strong> Lasting symbols of the imagination of Roman engineers are the many arched bridges and viaducts still standing today that helped achieve the engineers’ straight-line goal. The Romans built to last, and the piers of bridges which crossed rivers, for example, were often built with a resistant prow-shape and used massive durable blocks of stone, while the upper parts might be built of stone blocks strengthened with iron clamps. Perhaps the most impressive bridge was at Narni; 180 metres long, 8 metres wide and as high as 33 metres, it had 4 massive semicircular arches, one of which, stretching 32.1 metres, ranks as one of the longest block-arch spans in the ancient world. Recently hit by earthquakes, it is now having to undergo restoration work to repair the effects.</p>
<p>Such was the engineering and surveying skill of the Romans that many of their roads have provided the basis for hundreds of today’s routes across Europe and the Middle East. Many roads in Italy still use the original Roman name for certain stretches, and some bridges, such as at Tre Ponti in Venice, still carry road traffic today.</p>
</div>`,
      instruction:
        "This is a mock test for the IELTS Reading section. It is designed to help you practice your reading skills and prepare for the real test.",
      question_groups: [
        {
          id: "group_6",
          instruction:
            "The text has six sections, A-F. Which section mentions the following?",
          questionType: "matching",
          questions: [
            {
              id: "28",
              questionText: "the various functions of Roman roads",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "A",
            },
            {
              id: "29",
              questionText:
                "reference to some current remains of Roman road building",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "B",
            },
            {
              id: "30",
              questionText: "a description of preparations for building a road",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "C",
            },
            {
              id: "31",
              questionText: "the period in history when road building began",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "D",
            },
            {
              id: "32",
              questionText:
                "the consequence of damage caused by a natural disaster",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "E",
            },
            {
              id: "33",
              questionText: "the total distance once crossed by Roman roads",
              options: ["A", "B", "C", "D", "E", "F"],
              correct_answer: "F",
            },
          ],
        },
        {
          id: "group_7",
          instruction: "Choose the correct letter, A, B, C or D.",
          questionType: "multiple_choice",
          questionText: ``,
          questions: [
            {
              id: "34",
              questionText:
                "Which aspect of Roman road building does the writer mention in Section A?",
              options: [
                "the strength and permanence of the roads",
                "the magnificence and practicality of the roads",
                "the number of people involved in building",
                "the powerful people who financed the roads",
              ],
              correct_answer: "the strength and permanence of the roads",
            },
            {
              id: "35",
              questionText:
                "The writer compares the Appian Way to a modern highway because",
              options: [
                "it was lengthened over time.",
                "it took a long time to construct.",
                "it was used by a large number of travellers.",
                "it was designed to avoid certain areas.",
              ],
              correct_answer: "it was lengthened over time.",
            },
            {
              id: "36",
              questionText:
                "The writer compares the Appian Way to a modern highway because",
              options: [
                "it was lengthened over time.",
                "it took a long time to construct.",
                "it was used by a large number of travellers.",
                "it was designed to avoid certain areas.",
              ],
              correct_answer: "it was used by a large number of travellers.",
            },
            {
              id: "37",
              questionText:
                "The writer compares the Appian Way to a modern highway because",
              options: [
                "it was lengthened over time.",
                "it took a long time to construct.",
                "it was used by a large number of travellers.",
                "it was designed to avoid certain areas.",
              ],
              correct_answer: "it was designed to avoid certain areas.",
            },
          ],
        },
      ],
    },
  ],
};
