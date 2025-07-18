export const mocktest = {
  test_id: "ielts_reading_mock_01",
  title: "IELTS Reading Mock Test",
  time_limit: 60,
  parts: [
    {
      id: "1",
      title: "The History of Ice Cream",
      content_html: `<div id="ielts-reading-transcript-1" class="ielts-reading-transcript current">
        <p>==== Read the text below and answer questions 1-7 ====</p>
        <p><strong>Dry Cleaning Services - Your Rights</strong></p>
        <p>When you leave items at a dry cleaner's, they have a legal responsibility to take care of them. This applies even if there's a sign in the shop saying they're not responsible for lost or damaged items. If something goes wrong, here's what you should know about your rights.</p>
        <p>If an item is lost or damaged, the dry cleaner should compensate you for its current value, not what you originally paid for it. This is because items lose value over time. However, if you have a receipt showing what you paid, the company should refund that amount.</p>
        <p>If you're not satisfied with how your complaint is handled, you can contact the Dry Cleaning Trade Association. They can help mediate between you and the company. They may also be able to provide independent advice about the value of your item.</p>
        <p>If you're offered compensation that seems too low, you can get a valuation from an independent expert, but you'll need to pay for this service. The expert's report can be used as evidence if you decide to take the matter to court.</p>
        <p>Taking a case to court should be a last resort, as it can be expensive and time-consuming. However, if you do decide to go to court, you must do so within six months of the incident. After this time, you may not be able to make a claim.</p>
        </div>`,
      instruction: " Listen and answer questions 1-10",
      audio_url:
        "https://file-examples.com/storage/feb2b5780e6861a159e5a39/2017/11/file_example_MP3_5MG.mp3",
      question_groups: [
        {
          id: "1",
          instruction: "",
          questionType: "text_input",
          questionText: `<div class="ielts-listening-question-section-content">
                                            <p>Complete the notes below</p>
<p>Write&nbsp;<b>ONE WORD AND/OR A NUMBER</b>&nbsp;for each answer.</p>
<p style="text-align: center"><strong>First day at work</strong></p>
<table>
<tbody>
<tr>
<td>Name of supervisor</td>
<td><span class="ielts-listening-question-item">______</span></td>
</tr>
<tr>
<td>Where to leave coat and bag:</td>
<td>use <span class="ielts-listening-question-item">______</span> in staffroom</td>
</tr>
<tr>
<td>See Tiffany in HR:</td>
<td>to give <span class="ielts-listening-question-item">______</span> number to
</tr>
<tr>
<td>Location of HR office:</td>
<td>on <span class="ielts-listening-question-item">______</span>&nbsp;floor</td>
</tr>
<tr>
<td>Supervisor’s mobile number:</td>
<td><span class="ielts-listening-question-item">______</span></td>
</tr>
</tbody>
</table>
                                        </div>`,
          seekPosition: 20,
          questions: [
            {
              id: "1",
              questionText:
                "Dry cleaners are generally responsible for items left with them, even if there's a sign saying the opposite.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "TRUE",
            },
            {
              id: "2",
              questionText:
                "If the dry cleaner loses an item belonging to you, they should give you enough money to buy a completely new one.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "FALSE",
            },
            {
              id: "3",
              questionText:
                "If you have the receipt for a damaged item, the company should refund the amount you originally paid for it.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "FALSE",
            },
            {
              id: "4",
              questionText:
                "It may be possible to get support for your complaint from a dry cleaners' trade association.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "TRUE",
            },
            {
              id: "5",
              questionText:
                "If you're offered too little compensation, you can request a free report from an independent organisation.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "FALSE",
            },
            {
              id: "6",
              questionText:
                "Most people who take a case about a dry-cleaning company to court are satisfied with the outcome.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "NOT GIVEN",
            },
            {
              id: "7",
              questionText:
                "If an item was lost or damaged nine months ago, you can still take the dry cleaner to court.",
              options: ["TRUE", "FALSE", "NOT GIVEN"],
              correctAnswer: "TRUE",
            },
          ],
        },
        {
          id: "2",
          instruction:
            "The text has six paragraphs, A-F. Which paragraph mentions the following?",
          questionType: "matching",
          seekPosition: 20,
          questions: [
            {
              id: "8",
              questionText:
                "Members of this group share ideas for the books they would like to read.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "A",
            },
            {
              id: "9",
              questionText:
                "It isn't possible for any new members to join this group at present.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "F",
            },
            {
              id: "10",
              questionText:
                "You can get feedback on your own work from other members of this group.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "B",
            },
            {
              id: "11",
              questionText:
                "This group focuses on stories belonging to just one genre.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "C",
            },
            {
              id: "12",
              questionText:
                "Work produced by members of this group will be available to the public.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "F",
            },
            {
              id: "13",
              questionText:
                "This group doesn't read or write either poetry or fiction.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "E",
            },
            {
              id: "14",
              questionText:
                "This group would suit someone who thinks they could write a book.",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "B",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Photography Weekend Course",
      content_html: `<div id="ielts-reading-transcript-2" class="ielts-reading-transcript current">
      <p>==== Read the text below and answer Questions 15-22 ====</p>
      <p><strong>Lifting Equipment Safety Guidelines</strong></p>
      <p>All lifting equipment must be properly manufactured and certified. This includes having a CE mark to show it meets European safety standards. Before use, equipment may need to undergo various tests to ensure it's safe and fit for purpose. Regular inspections by a qualified engineer are also essential to maintain safety standards.</p>
      <p>For crane operations, lift plans are crucial documents. They help establish and implement control measures to manage any potential risks. During a 'Tool Box Talk' session, the lifting crew can be consulted to discuss the plan and ensure everyone understands their role.</p>
      <p>When working with heavy loads, several precautions must be taken. Physical barriers should be used to prevent loads from passing over people's heads. A banksman should be appointed to give clear verbal directions to the crane driver, helping to prevent accidents.</p>
      <p>Secondary lifting equipment such as chains and slings require special attention. While they may seem less significant than primary lifting equipment, they are actually more likely to cause injuries if not properly maintained or used incorrectly.</p>
  </div>`,
      instruction:
        "This is a mock test for the IELTS Reading section. It is designed to help you practice your reading skills and prepare for the real test.",
      audio_url:
        "https://file-examples.com/storage/feb2b5780e6861a159e5a39/2017/11/file_example_MP3_5MG.mp3",
      question_groups: [
        {
          id: "3",
          instruction:
            "Complete the notes below. Choose NO MORE THAN TWO WORDS for each answer from the passage.",
          questionType: "text_input",
          questionText: `
<p><strong>Lifting equipment</strong></p>
<p>• must be manufactured well e.g have a ______ on it</p>
<p>• may need to undergo ______</p>
<p>• may need a regular check by an ______</p>

<p><strong>Lift plans</strong></p>
<p>• relevant to cranes</p>
<p>• used to establish and carry out ______ for any risks</p>
<p>• a ______ can be consulted during a 'Tool Box Talk'</p>

<p><strong>Preventing accidents with heavy loads</strong></p>
<p>• use objects such as ______ to make sure the load does not pass over anyone's head</p>
<p>• appoint ______ to give verbal directions to the crane driver</p>

<p><strong>Secondary lifting equipment (chains, slings, etc.)</strong></p>
<p>• more likely to cause ______</p>`,
          seekPosition: 20,
          questions: [
            {
              id: "15",
              correctAnswer: "CE mark",
            },
            {
              id: "16",
              correctAnswer: "Tests",
            },
            {
              id: "17",
              correctAnswer: "Engineer",
            },
            {
              id: "18",
              correctAnswer: "Control measures",
            },
            {
              id: "19",
              correctAnswer: "lifting crew",
            },
            {
              id: "20",
              correctAnswer: "Barriers",
            },
            {
              id: "21",
              correctAnswer: "Banksman",
            },
            {
              id: "22",
              correctAnswer: "Injuries",
            },
          ],
        },
        {
          id: "4",
          instruction:
            "<p>Complete the table below. Choose <strong>ONE WORD ONLY</strong> for each answer from the passage.</p>",
          questionType: "text_input",
          questionText: `<table>
<tbody>
<tr>
<td colspan="3"><strong>Strategies for dealing with customer complaints</strong></td>
</tr>
<tr>
<td width="198"><strong>Strategy</strong></td>
<td width="198"><strong>Your approach</strong></td>
<td width="198"><strong>The customer…..</strong></td>
</tr>
<tr>
<td width="198">Stay calm</td>
<td width="198">
<ul>
<li>remember it is not a direct attack on you</li>
<li>do not try to <span class="ielts-reading-question-item">______</span> the argument</li>
</ul>
</td>
<td width="198">
<ul>
<li>usually had <span class="ielts-reading-question-item">______</span> that were not fulfilled</li>
</ul>
</td>
</tr>
<tr>
<td width="198">Listen well</td>
<td width="198">
<ul>
<li>use short phrases in reply</li>
</ul>
</td>
<td width="198">
<ul>
<li>cannot recognise a <span class="ielts-reading-question-item">______</span> until calm</li>
</ul>
</td>
</tr>
<tr>
<td width="198">Get the facts</td>
<td width="198">
<ul>
<li>ask questions and begin a proper conversation</li>
</ul>
</td>
<td width="198">
<ul>
<li>will start to trust you</li>
</ul>
</td>
</tr>
<tr>
<td width="198">Suggest action</td>
<td width="198">
<ul>
<li>be sure of your company's <span class="ielts-reading-question-item">______</span> on complaints</li>
</ul>
</td>
<td width="198">
<ul>
<li>may well make a verbal <span class="ielts-reading-question-item">______</span> in future</li>
</ul>
</td>
</tr>
</tbody>
</table>`,
          seekPosition: 40,
          questions: [
            { id: "23", correctAnswer: "win" },
            { id: "24", correctAnswer: "expectations" },
            { id: "25", correctAnswer: "solution" },
            { id: "26", correctAnswer: "policy" },
            { id: "27", correctAnswer: "apology" },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Photography Weekend Course",
      content_html: `<div id="ielts-reading-transcript-3" class="ielts-reading-transcript current"><p>==== Read the text below and answer questions 28-40 ====</p>
<p><strong>Roman Roads</strong></p>
<p><strong>A</strong> The long straight roads built by the Romans have in many cases become just as famous in history as their greatest emperors and generals. Building upon more ancient routes and creating a huge number of new ones Roman engineers were fearless in their plans to join one point to another in as straight line as possible whatever the difficulties in geography and the costs in manpower. Consequently roads required bridges tunnels, viaducts and many other architectural and engineering features to create a series of breathtaking but highly useful monuments which spread from Europe to eastern parts of the Roman Empire.</p>
<p><strong>B</strong> The Romans did not invent roads, but as in so many other areas, they took an idea which went back as far as the Bronze Age and extended that concept daring to squeeze from it the fullest possible potential. The first and most famous great Roman road was the Via Appia or Appian Way. Constructed from 312 BCE and covering 196 kilometers it linked Rome to ancient Capua in Italy in as straight a line as possible and was appropriately known to the Romans as the Regina Viarum or 'Queen of Roads'. Much like a modern highway it bypassed small towns along the way and it largely ignored geographical obstacles. The road would later be extended to 569 kilometers in length.</p>
<p><strong>C</strong> The network of public Roman roads covered over 120,000 kilometers. Besides permitting the rapid deployment of troops and more importantly the wheeled vehicles which supplied them with food and equipment, Roman roads allowed for an increase in trade and cultural exchange. Roads were also one of the ways Rome could demonstrate its authority. For this reason, many roads began and ended in a triumphal arch, and the imperial prestige associated with a road project was demonstrated in the fact that roads were very often named after the officials who funded them; for example, the Via Appia takes its name from the Roman magistrate Appius Claudius Caecus.</p>
<p><strong>D</strong> To achieve the objective of constructing the shortest routes possible between two points, all manner of engineering difficulties had to be overcome. Once extensive surveying had been carried out, to ensure the proposed route was actually straight and to determine what various engineering methods were needed, marshes had to be drained, forests cut through, creeks diverted, bedrock channelled, mountainsides cut into rivers crossed with bridges, valleys traversed with viaducts and tunnels built through mountains. When all that was done, roads had to be levelled, reinforced with support walls or terracing and then, of course, maintained which they were for over 800 years.</p>
<p><strong>E</strong> Major roads were around a standard 4.2 metres wide, which was enough space for two vehicles to pass each other. First a trench was dug in the earth, and a layer of large stones was used to form the foundation. This was followed by a substantial deposit of smaller broken materials – often crushed brick was used for this purpose, and on top of this, a layer of fine gravel was added. This upper section of the road was referred to as the nucleus and was then surfaced with blocks or slabs. Mountain roads might also have ridges running across the surface of the slabs, to give animals better grip, and have ruts cut into the stone to guide wheeled vehicles.</p>
<p>Roads were purposely inclined slightly from the centre down to the kerb to allow rainwater to run off along the sides. Many also had parallel ditches that collected the runoff and formed a drainage canal on each side of the road. A path of packed gravel for pedestrians typically ran along each side of the road, varying in width from 1 to 3 metres. Separating the path from the road were the kerb stones, which were regular upright slabs. Busier stretches of main roads had areas where vehicles could pull over, and some of these had services for travellers and their animals. Milestones were also set up at regular intervals along the road and these often recorded who was responsible for the upkeep of that stretch of the road and what repairs had been made.</p>
<p><strong>F</strong> Lasting symbols of the imagination of Roman engineers are the many arched bridges and viaducts still standing today that helped achieve the engineers' straight-line goal. The Romans built to last, and the piers of bridges which crossed rivers, for example, were often built with a resistant prow-shape and used massive durable blocks of stone, while the upper parts might be built of stone blocks strengthened with iron clamps. Perhaps the most impressive bridge was at Narni; 180 metres long, 8 metres wide and as high as 33 metres, it had 4 massive semicircular arches, one of which, stretching 32.1 metres, ranks as one of the longest block-arch spans in the ancient world. Recently hit by earthquakes, it is now having to undergo restoration work to repair the effects.</p>
<p>Such was the engineering and surveying skill of the Romans that many of their roads have provided the basis for hundreds of today's routes across Europe and the Middle East. Many roads in Italy still use the original Roman name for certain stretches, and some bridges, such as at Tre Ponti in Venice, still carry road traffic today.</p>
</div>`,
      instruction:
        "This is a mock test for the IELTS Reading section. It is designed to help you practice your reading skills and prepare for the real test.",
      audio_url:
        "https://file-examples.com/wp-content/storage/2017/11/file_example_MP3_1MG.mp3",
      question_groups: [
        {
          id: "6",
          instruction:
            "The text has six sections, A-F. Which section mentions the following?",
          questionType: "matching",
          seekPosition: 20,
          questions: [
            {
              id: "28",
              questionText: "the various functions of Roman roads",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "A",
            },
            {
              id: "29",
              questionText:
                "reference to some current remains of Roman road building",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "B",
            },
            {
              id: "30",
              questionText: "a description of preparations for building a road",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "C",
            },
            {
              id: "31",
              questionText: "the period in history when road building began",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "D",
            },
            {
              id: "32",
              questionText:
                "the consequence of damage caused by a natural disaster",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "E",
            },
            {
              id: "33",
              questionText: "the total distance once crossed by Roman roads",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "F",
            },
          ],
        },
        {
          id: "7",
          instruction: "Choose the correct letter, A, B, C or D.",
          questionType: "multiple_choice",
          seekPosition: 40,
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
              correctAnswer: "the strength and permanence of the roads",
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
              correctAnswer: "it was lengthened over time.",
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
              correctAnswer: "it was used by a large number of travellers.",
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
              correctAnswer: "it was designed to avoid certain areas.",
            },
          ],
        },
      ],
    },
    {
      id: "4",
      title: "Photography Weekend Course",
      content_html: `<div id="ielts-reading-transcript-3" class="ielts-reading-transcript current"><p>==== Read the text below and answer questions 28-40 ====</p>
<p><strong>Roman Roads</strong></p>
<p><strong>A</strong> The long straight roads built by the Romans have in many cases become just as famous in history as their greatest emperors and generals. Building upon more ancient routes and creating a huge number of new ones Roman engineers were fearless in their plans to join one point to another in as straight line as possible whatever the difficulties in geography and the costs in manpower. Consequently roads required bridges tunnels, viaducts and many other architectural and engineering features to create a series of breathtaking but highly useful monuments which spread from Europe to eastern parts of the Roman Empire.</p>
<p><strong>B</strong> The Romans did not invent roads, but as in so many other areas, they took an idea which went back as far as the Bronze Age and extended that concept daring to squeeze from it the fullest possible potential. The first and most famous great Roman road was the Via Appia or Appian Way. Constructed from 312 BCE and covering 196 kilometers it linked Rome to ancient Capua in Italy in as straight a line as possible and was appropriately known to the Romans as the Regina Viarum or 'Queen of Roads'. Much like a modern highway it bypassed small towns along the way and it largely ignored geographical obstacles. The road would later be extended to 569 kilometers in length.</p>
<p><strong>C</strong> The network of public Roman roads covered over 120,000 kilometers. Besides permitting the rapid deployment of troops and more importantly the wheeled vehicles which supplied them with food and equipment, Roman roads allowed for an increase in trade and cultural exchange. Roads were also one of the ways Rome could demonstrate its authority. For this reason, many roads began and ended in a triumphal arch, and the imperial prestige associated with a road project was demonstrated in the fact that roads were very often named after the officials who funded them; for example, the Via Appia takes its name from the Roman magistrate Appius Claudius Caecus.</p>
<p><strong>D</strong> To achieve the objective of constructing the shortest routes possible between two points, all manner of engineering difficulties had to be overcome. Once extensive surveying had been carried out, to ensure the proposed route was actually straight and to determine what various engineering methods were needed, marshes had to be drained, forests cut through, creeks diverted, bedrock channelled, mountainsides cut into rivers crossed with bridges, valleys traversed with viaducts and tunnels built through mountains. When all that was done, roads had to be levelled, reinforced with support walls or terracing and then, of course, maintained which they were for over 800 years.</p>
<p><strong>E</strong> Major roads were around a standard 4.2 metres wide, which was enough space for two vehicles to pass each other. First a trench was dug in the earth, and a layer of large stones was used to form the foundation. This was followed by a substantial deposit of smaller broken materials – often crushed brick was used for this purpose, and on top of this, a layer of fine gravel was added. This upper section of the road was referred to as the nucleus and was then surfaced with blocks or slabs. Mountain roads might also have ridges running across the surface of the slabs, to give animals better grip, and have ruts cut into the stone to guide wheeled vehicles.</p>
<p>Roads were purposely inclined slightly from the centre down to the kerb to allow rainwater to run off along the sides. Many also had parallel ditches that collected the runoff and formed a drainage canal on each side of the road. A path of packed gravel for pedestrians typically ran along each side of the road, varying in width from 1 to 3 metres. Separating the path from the road were the kerb stones, which were regular upright slabs. Busier stretches of main roads had areas where vehicles could pull over, and some of these had services for travellers and their animals. Milestones were also set up at regular intervals along the road and these often recorded who was responsible for the upkeep of that stretch of the road and what repairs had been made.</p>
<p><strong>F</strong> Lasting symbols of the imagination of Roman engineers are the many arched bridges and viaducts still standing today that helped achieve the engineers' straight-line goal. The Romans built to last, and the piers of bridges which crossed rivers, for example, were often built with a resistant prow-shape and used massive durable blocks of stone, while the upper parts might be built of stone blocks strengthened with iron clamps. Perhaps the most impressive bridge was at Narni; 180 metres long, 8 metres wide and as high as 33 metres, it had 4 massive semicircular arches, one of which, stretching 32.1 metres, ranks as one of the longest block-arch spans in the ancient world. Recently hit by earthquakes, it is now having to undergo restoration work to repair the effects.</p>
<p>Such was the engineering and surveying skill of the Romans that many of their roads have provided the basis for hundreds of today's routes across Europe and the Middle East. Many roads in Italy still use the original Roman name for certain stretches, and some bridges, such as at Tre Ponti in Venice, still carry road traffic today.</p>
</div>`,
      instruction:
        "This is a mock test for the IELTS Reading section. It is designed to help you practice your reading skills and prepare for the real test.",
      audio_url:
        "https://file-examples.com/wp-content/storage/2017/11/file_example_MP3_1MG.mp3",
      question_groups: [
        {
          id: "8",
          instruction:
            "The text has six sections, A-F. Which section mentions the following?",
          questionType: "matching",
          seekPosition: 20,
          questions: [
            {
              id: "38",
              questionText: "the various functions of Roman roads",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "A",
            },
            {
              id: "39",
              questionText:
                "reference to some current remains of Roman road building",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "B",
            },
            {
              id: "40",
              questionText: "a description of preparations for building a road",
              options: ["A", "B", "C", "D", "E", "F"],
              correctAnswer: "C",
            },
          ],
        },
      ],
    },
  ],
};
