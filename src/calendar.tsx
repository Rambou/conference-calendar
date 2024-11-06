import { useState } from "react";
import { Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "./components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tab";
import AddToCalendarButton from "./add-calendar";

const SymposiumCalendar = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);

  const formatDate = (date, time) => {
    const [hours, minutes] = time.split(":");
    return new Date(2025, 4, date, hours, minutes);
  };

  const eventTypes = {
    ceremony: "bg-amber-200",
    lecture: "bg-yellow-600",
    session1: "bg-orange-400",
    session2a: "bg-lime-100",
    session2b: "bg-lime-200",
    session2c: "bg-lime-300",
    session3a: "bg-indigo-200",
    session3b: "bg-indigo-300",
    session3c: "bg-indigo-400",
    session4a: "bg-cyan-300",
    session4b: "bg-cyan-500",
    Young: "bg-orange-200",
    break: "bg-rose-400",
    poster: "bg-gray-400",
    assembly: "bg-amber-50",
  };

  interface Event {
    id: string;
    title: string;
    startTime: Date;
    endTime?: Date;
    location?: string;
    type: keyof typeof eventTypes;
    description?: string;
    speakers?:
      | { name: string; topic: string; affiliation?: String }[]
      | string[];
    details?: string;
  }

  const events: { [key: string]: Event[] } = {
    "may-18": [
      {
        id: "opening",
        title: "Opening Ceremony",
        startTime: new Date(Date.UTC(2025, 4, 18, 12, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 18, 12, 30, 0)),
        type: "ceremony",
        location: "Hall A",
        description: "",
      },
      {
        id: "s1",
        title: "S1 Neuron-glia interactions in neurodegenerative diseases",
        startTime: new Date(Date.UTC(2025, 4, 18, 12, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 18, 14, 30, 0)),
        location: "Hall A",
        type: "session1",
        description:
          "Chair: Rebecca Matsas (Hellenic Pasteur Institute, Greece)",
        speakers: [
          {
            affiliation: "Dementia Research Institute, UK",
            name: "Soyon Hong",
            topic:
              "S1-01	Neuroimmune mechanisms targeting synapses in models of Alzheimer’s and Parkinson’s disease",
          },
          {
            name: "Stefano Pluchino",
            affiliation: "University of Cambridge, UK",
            topic:
              "S1-02	Mitochondrial complex I activity in microglia sustains neuroinflammation and neurotoxic damage: a novel therapeutic target for multiple sclerosis",
          },
          {
            name: "Rebecca Matsas",
            affiliation: "Hellenic Pasteur Institute, Greece ",
            topic:
              "S1-03  The yin and yang of astrocyte-neuron interactions in Parkinson’s disease: implications for pathology and treatment strategies",
          },
          {
            name: "Klaus Armin Nave",
            affiliation:
              "Max  Planck  Institute for Multidisciplinary Sciences, Germany",
            topic:
              "S1-04  Oligodendrocytes and neurons as drivers of amyloid-β deposition in Alzheimer’s disease ",
          },
          {
            name: "Erika Tagliatti",
            affiliation: "Humanitas Research Hospital, Italy",
            topic:
              "S1-05  Microglial Trem2 control of neuronal bioenergetics and synaptic function: implications for neurodevelopmental/ neurodegenerative diseases",
          },
        ],
      },
      {
        id: "s2",
        title:
          "S2 From gene to investigational drug: ADNP protein and davunetide",
        startTime: new Date(Date.UTC(2025, 4, 18, 12, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 18, 14, 30, 0)),
        location: "Hall B",
        type: "session1",
        description: "Chair: Illana Gozes (Tel Aviv University, Israel)",
        speakers: [
          {
            name: "llana Gozes & Maram Ganaiem",
            affiliation: "Tel Aviv University, Israel",
            topic:
              "S2-01	ADNP/Davunetide discovery and clinical development - introduction",
          },
          {
            name: "Frank Kooy & Claudio Peter D'Incal",
            affiliation: "University of Antwerp, Belgium",
            topic:
              "S02-02 The Helsmoortel Van der Aa (ADNP) syndrome: a molecular perspective bridging patient-derived cell models, mice, and patients",
          },
          {
            name: "David Pozo Perez",
            affiliation: "University of Seville, Spain",
            topic:
              "S2-03	Gene editing and functional characterization reveal ADNP protein physiological roles in microglia and its potential implications in neuronal cross-talk",
          },
          {
            name: "Velia D'Agata",
            affiliation: "University of Catania, Italy",
            topic: "S2-04	ADNP/davunetide (NAP) protection of the eye ",
          },
        ],
      },
      {
        id: "s3",
        title:
          "S3 Significance of extracellular vesicles in brain function and disease",
        startTime: new Date(Date.UTC(2025, 4, 18, 12, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 18, 14, 30, 0)),
        location: "Hall C",
        type: "session1",
        description:
          "Chairs: Anja Schneider  (DZNE Bonn, Germany), Christian Neri (INSERM & Sorbonne University, France)",
        speakers: [
          {
            name: "Ege Kavalali",
            affiliation: "Vanderbilt University, USA",
            topic:
              "S3-01	Extracellular vesicle dependent regulation of synaptobrevin/VAMP recycling in synapses",
          },
          {
            name: "Claudia Verderio",
            affiliation: "University Milano-Bicocca, Italy",
            topic:
              "S3-02	Microglial extracellular vesicles mediate C1q deposition at the synapse and promote pre-synaptic pruning",
          },
          {
            name: "Kenneth W Witwer",
            affiliation: "Johns Hopkins University, USA",
            topic:
              "S3-03	RNA-containing extracellular vesicles analysis: obstacles and opportunities",
          },
          {
            name: "Anja Schneider",
            affiliation:
              "German Center for Neurodegenerative Diseases (DZNE), Germany",
            topic:
              "S3-04	Extracellular vesicles as biomarkers in central nervous system diseases",
          },
        ],
      },
      {
        id: "plenary-1",
        title: "Plenary Lecture by Tom Südhof",
        startTime: new Date(Date.UTC(2025, 4, 18, 15, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 18, 16, 30, 0)),
        type: "lecture",
        location: "Hall A",
        speakers: [
          {
            name: "Tom Südhof",
            affiliation:
              "Nobel Laurate 2013 | Avram Goldstein Professor School of Medicine | Professor, Departments of Neurosurgery, of Neurology and of Psychiatry and Behavioral Science, University of California San Fransisco, USA",
            topic: "",
          },
        ],
      },
      {
        id: "welcome-reception",
        title: "Welcome Reception",
        startTime: new Date(Date.UTC(2025, 4, 18, 16, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 18, 17, 30, 0)),
        type: "ceremony",
        location: "Foyer",
      },
    ],
    "may-19": [
      {
        id: "special-lecture",
        title: "Special Lecture by Moussa Youdim",
        startTime: new Date(Date.UTC(2025, 4, 19, 5, 15, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 6, 0, 0)),
        type: "poster",
        location: "Hall A",
        speakers: [
          {
            name: "Moussa Youdim",
            affiliation: "Israel Institute of Technology, Israel",
            topic: "",
          },
        ],
      },
      {
        id: "ysla-1",
        title: "Young Investigator Lectureship Award (YSLA) I",
        startTime: new Date(Date.UTC(2025, 4, 19, 6, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 6, 30, 0)),
        type: "Young",
        location: "Hall A",
      },
      {
        id: "ysla-2",
        title: "Young Investigator Lectureship Award (YSLA) II",
        startTime: new Date(Date.UTC(2025, 4, 19, 6, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 7, 0, 0)),
        type: "Young",
        location: "Hall A",
      },
      {
        id: "s4",
        title:
          "S4 Astrocyte regulation of neural circuits: impact on brain functions",
        startTime: new Date(Date.UTC(2025, 4, 19, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 9, 30, 0)),
        location: "Hall A",
        type: "session2a",
        description:
          "Chairs: oão Filipe Oliveira (Portugal), Carmen Falcone (Italy)",
        speakers: [
          {
            name: "João Filipe Oliveira",
            affiliation: "University of Minho, Portugal",
            topic:
              "S4-01	The involvement of astrocyte calcium-dependent signaling in fear memory",
          },
          {
            name: "Marta Navarrete",
            affiliation: "Cajal Institute, Spain	",
            topic:
              "S4-02	Catching astrocyte ensembles: their role in memory formation and expression",
          },
          {
            name: "Alfonso Araque",
            affiliation: "University of Minnesota, USA",
            topic:
              "S4-03	Tripartite synapses: Astrocyte regulation of synaptic transmission, circuit function and animal behavior  ",
          },
          {
            name: "Carmen Falcone",
            affiliation: "nternational School for Advanced Studies, Italy",
            topic:
              "S4-04	Varicose-projection astrocytes: from evolution to neuroinflammation ",
          },
        ],
      },
      {
        id: "s5",
        title:
          "S5 Emerging concepts and approaches in targeting human neurodegenerative diseases",
        startTime: new Date(Date.UTC(2025, 4, 19, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 9, 30, 0)),
        location: "Hall B",
        type: "session2a",
        description: "Chair: Kostas Vekrellis (BRFAA, Greece)",
        speakers: [
          {
            name: "Vasileia Alexaki",
            affiliation: "Technical University of Dresden",
            topic:
              "S5-01	Metabolic reprograming of microglia in neurodegenerative disease ",
          },
          {
            name: "Yassemi Koutmani",
            affiliation:
              "Biomedical  Research  Foundation  Academy  of Athens, Greece",
            topic:
              "S5-02 Human brain organoids: understanding the role of the “niche” in neuroregeneration",
          },
          {
            name: "Katia Karalis",
            affiliation: "Regeneron Pharmaceuticals, USA",
            topic:
              "S5-03	Microphysiological systems for mapping of cell-cell interactions in the development of human neurodegenerative diseases",
          },
          {
            name: "Kostas Vekrellis",
            affiliation:
              "Biomedical  Research  Foundation  Academy  of Athens, Greece",
            topic:
              "S5-04	The role of extracellular vesicles in neuron-glia interactions ",
          },
        ],
      },
      {
        id: "s6",
        title: "S6 RNA dynamics and translation: key to brain function",
        startTime: new Date(Date.UTC(2025, 4, 19, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 9, 30, 0)),
        location: "Hall C",
        type: "session2a",
        description:
          "Chairs: Filipe Duarte (University of Coimbra, Portugal), Marta Zaninello (University of Cologne, Germany)",
        speakers: [
          {
            name: "Angelika Harbauer",
            affiliation:
              "Max Planck Institute for Biological Intelligence, Germany",
            topic: "S6-01	Mitochondrial RNA hitch-hiking in neurons",
          },
          {
            name: "Elena Rugarli",
            affiliation: "University  of  Cologne, Germany",
            topic:
              "S6-02	Mechanisms supporting localised translation of mitochondrial proteins in axons",
          },
          {
            name: "Ginny G. Farías",
            affiliation: "Utrecht University, Netherlands",
            topic: "S6-03	Regulation of the axonal proteome",
          },
          {
            name: "Martine Cohen-Salmon",
            affiliation: "College of France, France",
            topic:
              "S6-04	Local translation in astrocytes for the development and regulation of the glio-neuro-vascular interface",
          },
        ],
      },
      {
        id: "s7",
        title:
          "S7	Mechanisms of glial cells contribution in the development of neurodegenerative diseases",
        startTime: new Date(Date.UTC(2025, 4, 19, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 13, 0, 0)),
        location: "Hall A",
        type: "session2b",
        description:
          "Chair: Dimitra Thomaidou (Hellenic Pasteur Institute, Greece)",
        speakers: [
          {
            name: "Katerina Akassoglou ",
            affiliation:
              "University of California, San Francisco & Gladstone Institutes, USA",
            topic:
              "S7-01	Unlocking neuroimmune drivers of neurodegeneration: mechanisms and therapies",
          },
          {
            name: "Michal Schwartz",
            affiliation: "Weizmann Institute of Science, Israel",
            topic:
              "S7-02	The brain-immune ecosystem: Supporting brain health in the context of aging and neurodegeneration	",
          },
          {
            name: "Emmanuel Nivet",
            affiliation: "Aix-Marseille University, France",
            topic:
              "S7-03	hiPSC-based models to investigate the contribution of human astrocytes in age-related brain diseases",
          },
          {
            name: "Dimitra Thomaidou",
            affiliation: "Hellenic Pasteur Institute, Greece",
            topic:
              "S7-04	The Alzheimer’s disease risk factor BIN1 is a regulator of glial cell response to neuroinflammation},",
          },
        ],
      },
      {
        id: "s8",
        title:
          "S8	Shedding light on the interaction between cannabinoids use and risk of psychiatric disorders: focus on translational studies",
        startTime: new Date(Date.UTC(2025, 4, 19, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 13, 0, 0)),
        location: "Hall B",
        type: "session2b",
        description:
          "Chair: Maria Antonietta De Luca (University of Cagliari, Italy)",
        speakers: [
          {
            name: "Sarah Beggiato",
            affiliation: "University of Ferrara, Italy",
            topic:
              "S8-01	Enduring kynurenine pathway alterations triggered by the exposure to cannabinoids in critical phases of brain maturation ",
          },
          {
            name: "Steven Laviolette",
            affiliation: "University of Western Ontario, Canada",
            topic:
              "S8-02	Impacts of maternal cannabis use on long-term psychiatric risk: the promise of interventions targeting the Omega-3 fatty acid signaling network",
          },
          {
            name: "Maria Antonietta De Luca",
            affiliation: "University of Cagliari, Italy",
            topic:
              "S8-03	Neurobiological sequelae of the administration of synthetic cannabinoid receptor agonists during adolescence",
          },
          {
            name: "Aviv Weinstein",
            affiliation: "Ariel University, Israel",
            topic:
              "S8-04	The effects of cannabis and synthetic cannabinoids on cognitive function and brain structure and function in fMRI",
          },
          {
            name: "Diego Quattrone",
            affiliation: "King’s College London, UK",
            topic:
              "S8-05	Genetic variations in the endocannabinoid system and their psychoplastic effects ",
          },
        ],
      },
      {
        id: "s9",
        title:
          "S9	Convergent molecular dysfunctions in neurodevelopmental disorders: insights from studies on Fragile X syndrome",
        startTime: new Date(Date.UTC(2025, 4, 19, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 13, 0, 0)),
        location: "Hall C",
        type: "session2b",
        description:
          "Chairs: Maria Vincenza Catania (Institute for Biomedical Research and Innovation, Italy), Carlos Duarte (University of Coimbra, Portugal)",
        speakers: [
          {
            name: "Laura Cancedda",
            affiliation: "Italian Institute of Technology, Italy",
            topic:
              "S9-01	Negr1 is a new possible convergent hub for autistic spectrum disorders, including Fragile X",
          },
          {
            name: "Carlos Duarte",
            affiliation: "University of Coimbra, Portugal",
            topic:
              "S9-02	Molecular mechanisms underlying the impairment in hippocampal LTP in Fragile X syndrome",
          },
          {
            name: "Maria Vincenza Catania",
            affiliation:
              "Institute for Biomedical Research and Innovation, Italy ",
            topic:
              "S9-03	Fragile X syndrome: molecular and synaptic dysfunctions and therapeutic implications",
          },
          {
            name: "Barbara Bardoni",
            affiliation:
              "Institute of  Molecular and Cellular Pharmacology, France",
            topic:
              "S9-04	Novel and complementary pre-clinical approaches to treat Fragile X syndrome",
          },
        ],
      },
      {
        id: "s10",
        title:
          "S10	Mitochondria dynamics in ageing and neurodegenerative diseases",
        startTime: new Date(Date.UTC(2025, 4, 19, 13, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 15, 30, 0)),
        location: "Hall A",
        type: "session2c",
        description:
          "Chairs: Angelo Poletti (University of Milan, Italy), Giampietro Schiavo (University College of London, UK)",
        speakers: [
          {
            name: "Nektarios Tavernarakis",
            affiliation: "Foundation for Research and Technology, Greece",
            topic:
              "S10-01	Mitophagy and mitochondrial biogenesis in ageing and neurodegeneration",
          },
          {
            name: "Allen Kaasik",
            affiliation: "University of Tartu, Estonia",
            topic:
              "S10-02	From ER calcium handling to mitophagy: pathways to neuronal health restoration",
          },
          {
            name: "Noemi Esteras ",
            affiliation: "Complutense University of Madrid, Spain",
            topic:
              "S10-03	The different roles of mitochondria as modulators of calcium signalling in tauopathies",
          },
          {
            name: "Giampietro Schiavo ",
            affiliation: "University College of London, UK",
            topic:
              "S10-04	Axonal transport impairments in neurodegenerative diseases: mechanistic diversity and resulting therapeutic strategies",
          },
          {
            name: "Marta Cozzi ",
            affiliation: "University of Milan, Italy",
            topic:
              "S10-05	Altered mitochondrial dynamics in KIF5A-associated neurodegenerative or neurodevelopmental disorders",
          },
        ],
      },
      {
        id: "s11",
        title:
          "S11	Old players-new tricks: novel concepts of cortical interneuron function in disease",
        startTime: new Date(Date.UTC(2025, 4, 19, 13, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 15, 30, 0)),
        location: "Hall B",
        type: "session2c",
        description:
          "Chairs: Lida Zoupi (University of Edinburgh, UK), Myrto Denaxa (University of Patras, Greece)",
        speakers: [
          {
            name: "Laurent Nguyen",
            affiliation: "University of Liege, Belgium",
            topic:
              "S11-01	Neuro-glia interactions influence cortical morphogenesis across species",
          },
          {
            name: "Leena Williams",
            affiliation: "University of Edinburgh, UK	",
            topic:
              "S11-02	Unraveling how interneurons gate neocortical plasticity and sensory representation",
          },
          {
            name: "Emmanuel Nivet",
            affiliation: "University of Paris, France",
            topic:
              "S11-03	Prefrontal low gamma oscillations and fear extinction learning rely on early interneuron-oligodendroglia communication",
          },
          {
            name: "Maarten Kole",
            affiliation: "Netherlands Institute for Neuroscience, Netherlands",
            topic: "S11-04	The rhythms of parvalbumin interneuron myelination",
          },
        ],
      },
      {
        id: "s12",
        title:
          "S12	Microglia-centric body to brain interactions in neuropsychiatric disorders",
        startTime: new Date(Date.UTC(2025, 4, 19, 13, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 15, 30, 0)),
        location: "Hall C",
        type: "session2c",
        description: "Chair: Ali Jawaid (Poland)",
        speakers: [
          {
            name: "Anthony Hannan ",
            affiliation: "University of Melbourne, Australia",
            topic:
              "S12-01	Gene-environment and brain-body interactions in preclinical models of neuropsychiatric disorders",
          },
          {
            name: "Ali Jawaid ",
            affiliation:
              "Polish Center for Technology Development & Nencki Institute of Experimental Biology, Poland",
            topic:
              "S12-02	Microglia-lipid interactions determine resilience to adverse childhood experiences and neurodegeneration",
          },
          {
            name: "Agnes Nadjar ",
            affiliation: "University of Bordeaux, France",
            topic:
              "S12-03	Metabolic reprogramming of microglia contributes to sex-dependent impairments in metabolic flexibility",
          },
          {
            name: "Blanca Aldana",
            affiliation: "University of Copenhagen, Denmark",
            topic:
              "S12-04	Therapeutic implications of medium-chain fatty acids in modulating microglia metabolism and neurotransmitter homeostasis in neurodegenerative diseases",
          },
        ],
      },
    ],
    "may-20": [
      {
        id: "plenary-2",
        title: "Plenary Lecture by Giovanna Mallucci",
        startTime: new Date(Date.UTC(2025, 4, 20, 6, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 7, 0, 0)),
        type: "lecture",
        location: "Hall A",
        speakers: [
          {
            name: "Giovanna Mallucci",
            affiliation:
              "Professor of Clinical Neurosciences | Associate Director of the UK Dementia Research Institute, University of University of Cambridge, UK",
            topic: "",
          },
        ],
      },
      {
        id: "s13",
        title: "S13 Cellular mechanisms of white matter homeostasis",
        startTime: new Date(Date.UTC(2025, 4, 20, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 9, 30, 0)),
        location: "Hall A",
        type: "session3a",
        description: "Chair: Ali Jawaid (University of Zurich, Switzerland)",
        speakers: [
          {
            name: "Rafael Almeida",
            affiliation: "University of Edinburgh, UK",
            topic:
              "S13-01	Getting a grip on myelination: in vivo imaging of axon-myelin adhesion using zebrafish",
          },
          {
            name: "Aiman S Saab ",
            affiliation: "University of Zurich, Switzerland",
            topic:
              "S13-02	Illuminating the interplay between oligodendrocytes and axon functions",
          },
          {
            name: "Vanja Tepavčević Mandic ",
            affiliation: "University of the Basque Country, Spain",
            topic:
              "S13-03	Monocarboxylates fuel myelin maintenance and repair in the central nervous system",
          },
          {
            name: "Anne Desmazières ",
            affiliation: "Paris Brain Institute, France",
            topic:
              "S13-04	Neuron-microglia interaction at the nodes of Ranvier in health and disease",
          },
        ],
      },
      {
        id: "s14",
        title:
          "S14 Metabolic alterations underlying brain resilience and pathogenesis in Alzheimer's disease",
        startTime: new Date(Date.UTC(2025, 4, 20, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 9, 30, 0)),
        location: "Hall B",
        type: "session3a",
        description:
          "Chair: Eugenio Barone (Sapienza University of Rome, Italy)",
        speakers: [
          {
            name: "Wenqiang Chen ",
            affiliation:
              "Harvard Medical School, USA and Steno Diabetes Center Copenhagen, Denmark",
            topic:
              "S14-01	Insulin-regulated glial activation alters cellular metabolism and uptake of Aβ in mouse models of Alzheimer’s disease",
          },
          {
            name: "Marie-Claude Potier ",
            affiliation: "Salpêtrière Hospital, France",
            topic:
              "S14-02	Cholesterol dys-homeostasis in the brain during implications for amyloid precursor protein processing",
          },
          {
            name: "Eugenio Barone ",
            affiliation: "Sapienza University of Rome, Italy",
            topic:
              "S14-03	The role of sex-differences in brain energy metabolism: from resilience to the risk of developing Alzheimer’s Disease",
          },
          {
            name: "Mychael V Lourenco ",
            affiliation: "Federal University of Rio de Janeiro, Brazil",
            topic:
              "S14-04	Metabolic factors associated with cognitive impairment in Alzheimer’s disease",
          },
        ],
      },
      {
        id: "s15",
        title:
          "S15	Crosstalk between sphingolipid signalling and neurodegeneration",
        startTime: new Date(Date.UTC(2025, 4, 20, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 9, 30, 0)),
        location: "Hall C",
        type: "session3a",
        description: "Chair: Riccardo Ghidoni (Sphingolipid Club, Italy)",
        speakers: [
          {
            name: "Chiara Donati",
            affiliation: "University of Florence, Italy",
            topic:
              "S15-01	Protective role of sphingosine 1-phosphate signaling axis in neurodegenerative diseases",
          },
          {
            name: "Museer A. Lone ",
            affiliation: "University of Zurich, Switzerland",
            topic:
              "S15-02	Sphingolipid homeostasis along the endomembrane system and its relevance in neurodegeneration",
          },
          {
            name: "Svjetlana Kalanj-Bognar ",
            affiliation: "University of Zagreb, Croatia",
            topic:
              "S15-03	Gangliosides modulate positioning and functions of proteins involved in synaptic plasticity and ion homeostasis – implications for neurodegeneration",
          },
          {
            name: "Liubov Kalinichenko",
            affiliation: "University of Erlangen, Germany",
            topic:
              "S15-04	Emotional behavior and alcohol consumption in early onset Parkinson’s disease: role of the sphingolipid system",
          },
        ],
      },
      {
        id: "YMS-1",
        title: "Young Member Symposium I",
        startTime: new Date(Date.UTC(2025, 4, 19, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 13, 0, 0)),
        type: "break",
        location: "Hall A",
      },
      {
        id: "YMS-2",
        title: "Young Member Symposium II",
        startTime: new Date(Date.UTC(2025, 4, 19, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 19, 13, 0, 0)),
        type: "break",
        location: "Hall A",
      },
      {
        id: "s16",
        title:
          "S16 	Molecular hallmarks of polyglutamine spinocerebellar ataxias ",
        startTime: new Date(Date.UTC(2025, 4, 20, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 13, 0, 0)),
        location: "Hall C",
        type: "session3b",
        description:
          "Chairs: Clévio Nóbrega & David Brito (University of Algarve, Portugal)",
        speakers: [
          {
            name: "Patrícia Maciel",
            affiliation: "University of Minho, Portugal",
            topic:
              "S16-01	From molecular pathogenesis to therapeutic targets: the SCA3/MJD case",
          },
          {
            name: "Luis Velázquez-Pérez",
            affiliation:
              "Center for the Research and Rehabilitation of Hereditary Ataxias, Cuba ",
            topic: "S16-02	Molecular biomarkers for SCA2 disease progression",
          },
          {
            name: "Angela Laird ",
            affiliation: "Macquarie University, Australia",
            topic: "S16-03	Gut-brain involvement in SCA3",
          },
          {
            name: "Thorsten Schmidt",
            affiliation: "University of Tübingen, Germany",
            topic:
              "S16-04	Genetic and molecular factors modifying the pathogenesis of Spinocerebellar Ataxia Type 3",
          },
        ],
      },
      {
        id: "s17",
        title:
          "S17 	Neuronal oscillations and brain network dynamics in health and disease",
        startTime: new Date(Date.UTC(2025, 4, 20, 13, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 15, 30, 0)),
        location: "Hall A",
        type: "session3c",
        description:
          "Chairs: Irini Skaliora (University of Athens, Greece) & Kyriaki Sidiropoulou (Univeristy of Crete, Greece)",
        speakers: [
          {
            name: "Victoria Puig",
            affiliation: "Barcelona Institute of Biomedical Research, Spain",
            topic:
              "S17-01	Abnormal prefrontal-hippocampal circuit dynamics in mouse models of schizophrenia: Role of serotonin receptors",
          },
          {
            name: "Wolf Singer",
            affiliation:
              "Ernst Struengmann Institute for Neuroscience, Germany",
            topic:
              "S17-02	Oscillations in the cerebral cortex: An essential mechanism for computations in dynamic state space",
          },
          {
            name: "Irini Skaliora ",
            affiliation: "University of Athens, Greece",
            topic:
              "S17-03	The transition from endogenous network activity to epileptiform discharges: a computational approach",
          },
          {
            name: "Stelios Smyrnakis",
            affiliation: "Harvard Medical School, USA",
            topic:
              "S17-04	Brain orchestra under spontaneous conditions: Identifying communication modules from the functional architecture of area V1",
          },
        ],
      },
      {
        id: "s18",
        title:
          "S18 	Novel mechanisms & therapeutics against depression and Alzheimer’s in the Precision Medicine era",
        startTime: new Date(Date.UTC(2025, 4, 20, 13, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 15, 30, 0)),
        location: "Hall B",
        type: "session3c",
        description:
          "Chairs: Ioannis Sotiropoulos (Greece) & Eleni Tzavara (France)",
        speakers: [
          {
            name: "Eleni Tzavara ",
            affiliation: "University of Paris Cité, France",
            topic:
              "S18-01	Synaptic plasticity-related novel targets and biomarkers in animal models and clinical cohorts of depression",
          },
          {
            name: "Luisa Pinto ",
            affiliation: "University of Minho, Portugal",
            topic:
              "S18-02	Psilocybin and optogenetic regulation of neurogenenic circuitry against stress-driven depressive pathology",
          },
          {
            name: "Ioannis Sotiropoulos ",
            affiliation: "Demokritos Research Center, Greece",
            topic:
              "S18-03	Exosomes and cannabidiol treatment in stress-driven Alzheimer’s disease brain pathology",
          },
          {
            name: "Joana Margarida Silva ",
            affiliation:
              "Life and Health Sciences Research Institute, Portugal",
            topic:
              "S18-04	Dissecting the interplay between Tau and RNA-Binding Protein dyshomeostasis in the precipitating role of chronic stress on brain pathology",
          },
        ],
      },
      {
        id: "s19",
        title: "S19 	Glial Cell Dynamics in Neurodegeneration",
        startTime: new Date(Date.UTC(2025, 4, 20, 13, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 20, 15, 30, 0)),
        location: "Hall C",
        type: "session3c",
        description:
          "Chairs: Antonella Tramutola (University of Rome, Italy) & Martina Gabrielli (CNR Institute of Neuroscience-Milano, Italy)",
        speakers: [
          {
            name: "Antonella Tramutola",
            affiliation: "University of Rome, Italy",
            topic:
              "S19-01	Unveiling the role of miRNAs in glial cells: insights into insulin signaling and neurodegeneration",
          },
          {
            name: "Martina Gabrielli",
            affiliation: "CNR Institute of Neuroscience-Milano, Italy",
            topic:
              "S19-02	Pathogenic roles of microglial extracellular vesicles in neurodegeneration",
          },
          {
            name: "Francesco Petrelli",
            affiliation: "University of Lausanne, Switzerland)",
            topic:
              "S19-03	The role of mitochondrial metabolism in glial cells: implications for health and Alzheimer’s disease",
          },
          {
            name: "Ottavio Arancio",
            affiliation: "Columbia University USA",
            topic:
              "S19-04	The effect of astrocytic tau deposition on synaptic plasticity",
          },
        ],
      },
    ],
    "may-21": [
      {
        id: "bachelard-lecture",
        title: "Bachelard Lecture by Tony Turner",
        startTime: new Date(Date.UTC(2025, 4, 21, 6, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 7, 0, 0)),
        type: "poster",
        location: "Hall A",
        speakers: [
          {
            name: "Tony Turner",
            affiliation: "Professor, University of Leeds, UK",
            topic: "",
          },
        ],
      },

      {
        id: "s20",
        title:
          "S20	Mitochondria-nucleus crosstalk in behaviour and neurological disease",
        startTime: new Date(Date.UTC(2025, 4, 21, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 9, 30, 0)),
        location: "Hall A",
        type: "session4a",
        description: "Chair: Juan P. Bolanos (University of Salamanca, Spain)",
        speakers: [
          {
            name: "Michaela Filiou",
            affiliation: "University of Ioannina, Greece",
            topic:
              "S20-01	Mitochondria dynamics at the crossroads of anxiety and behavior",
          },
          {
            name: "Angeles Almeida",
            affiliation: "University of Salamanca, Spain",
            topic:
              "S20-02	Mitochondria-nucleus p53 signaling in Alzheimer’s disease and stroke",
          },
          {
            name: "Nicoleta Moisoi",
            affiliation: "De Montfort University, UK",
            topic:
              "S20-03	Mitochondria stress signalling determines the cellular faith in Parkinson’s disease",
          },
          {
            name: "Giovanni Marsicano",
            affiliation: "University of Bordeaux, France",
            topic:
              "S20-04	Regulation of behaviour by mitochondrial CB1 receptor signaling",
          },
        ],
      },
      {
        id: "s21",
        title:
          "S21 Mechanisms of neural fate acquisition and synaptic function: from development to disease",
        startTime: new Date(Date.UTC(2025, 4, 21, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 9, 30, 0)),
        location: "Hall B",
        type: "session4a",
        description:
          "Chairs: Panagiotis Politis (BRFAA, Greece) & George Leondaritis (University of Ioannina, Greece)",
        speakers: [
          {
            name: "Leda Dimou",
            affiliation: "University of Ulm, Germany",
            topic:
              "S21-01	Oligodendrocyte progenitor cells: role and function in the healthy and injured brain",
          },
          {
            name: "Britta Eickholt",
            affiliation: "Charité- Berlin University Medicine, Germany",
            topic:
              "S21-02	Function and regulation of PLPPR3 membrane proteins in neurons",
          },
          {
            name: "George Leondaritis",
            affiliation: "University of Ioannina, Greece",
            topic:
              "S21-03	Bioactive lipid-dependent regulation of axonal growth during development",
          },
          {
            name: "Panagiotis Politis",
            affiliation:
              "Biomedical Research Foundation of the Academy of Athens (BRFAA), Athens, Greece",
            topic:
              "S21-04	Gene regulation networks in nervous system development and cancer progression",
          },
        ],
      },
      {
        id: "s22",
        title: "S22	Extracellular matrix and astrocytes in health and disease",
        startTime: new Date(Date.UTC(2025, 4, 21, 7, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 9, 30, 0)),
        location: "Hall C",
        type: "session4a",
        description: "Chair: Eva Syková (Slovak Academy of Sciences, Slovakia)",
        speakers: [
          {
            name: "Harald Sontheimer",
            affiliation: "University of Virginia, USA",
            topic:
              "S22-01	Perineuronal nets modulate intrinsic excitability and synaptic plasticity	",
          },
          {
            name: "Constanze Seidenbecher",
            affiliation: "Leibniz Institute for Neurobiology, Germany",
            topic:
              "S22-02	Hyaluronan-based neural ECM in pathophysiological plasticity of the brain",
          },
          {
            name: "Eva Syková ",
            affiliation: "Slovak Academy of Sciences, Slovakia",
            topic:
              "S22-03	Astrocytes and perineuronal nets in extrasynaptic transmission and neuroplasticity",
          },
          {
            name: "Jessica Kwok",
            affiliation: "University of Leeds, UK",
            topic:
              "S22-04	Modulation of chondroitin sulfates in the perineuronal nets mediate differential glial responses after CNS injury",
          },
        ],
      },
      {
        id: "s23",
        title:
          "S23 	The search for objective neuromarkers and effective interventions in rare monogenic neurodevelopmental disorders",
        startTime: new Date(Date.UTC(2025, 4, 21, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 13, 0, 0)),
        location: "Hall A",
        type: "session4b",
        description: "Chair: John J Foxe",
        speakers: [
          {
            name: "Sophie Molholm ",
            affiliation: "Albert Einstein College of Medicine, USA",
            topic:
              "S23-01	Developing neuromarkers of disease progression and cognitive function in human patients with CTNS gene mutations (Cystinosis)	",
          },
          {
            name: "Illana Gozes ",
            affiliation: "Tel Aviv University, Israel",
            topic:
              "S23-02	Sex-related efficacy in rare diseases: developing davunetide to treat individuals with mutations of the Activity-Dependent Neuroprotective Protein gene (ADNP), a rare monogenic variant of autism",
          },
          {
            name: "R. Anne McKinney ",
            affiliation: "Mc Gill University, Canada",
            topic:
              "S23-03	Explorations of the molecular and cellular pathways associated with mutations of the SLC9A6 gene (Christianson Syndrome)",
          },
          {
            name: "John J Foxe",
            affiliation: "University of Rochester, USA",
            topic:
              "S23-04	Developing a common neurophysiological endophenotype (neuromarker) in both human patients and a mouse model with CLN3 gene mutations (Batten Disease)",
          },
        ],
      },
      {
        id: "s24",
        title:
          "S24 	Extracellular vesicles as hubs for neurotrophin signalling and function ",
        startTime: new Date(Date.UTC(2025, 4, 21, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 13, 0, 0)),
        location: "Hall B",
        type: "session4b",
        description:
          "Chair: Maria José Diógenes (University of Lisbon, Portugal)",
        speakers: [
          {
            name: "Laura Marchetti",
            affiliation: "University of Pisa, Italy",
            topic:
              "S24-01	Targeted delivery of extracellular vesicles carrying RNA therapeutics: a novel role for neurotrophin receptors?",
          },
          {
            name: "Tiago Costa-Coelho",
            affiliation: "University of Lisbon, Portugal",
            topic:
              "S24-02	Loss of neuroprotection in Alzheimer’s disease: shedding light on BDNF receptor cleavage and its mirroring in extracellular vesicles",
          },
          {
            name: "Anna Antoniou",
            affiliation:
              "University of Bonn & German Center for Neurodegenerative Diseases Bonn, Germany",
            topic:
              "S24-03	Trans-synaptic signaling via EV and microRNA cargo mediates BDNF-dependent neuronal circuit formation",
          },
          {
            name: "Cristina Malagelada",
            affiliation: "University of Barcelona, Spain",
            topic:
              "S24-04	Neuron-derived EVs contain synaptic proteins, promote spine formation, activate TrkB-mediated signalling and preserve neuronal complexity",
          },
        ],
      },
      {
        id: "s25",
        title: "S25 	Brains, models and pharmacology",
        startTime: new Date(Date.UTC(2025, 4, 21, 11, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 13, 0, 0)),
        location: "Hall C",
        type: "session4b",
        description: "Chair: Pavle Andjus (University of Belgrade)",
        speakers: [
          {
            name: "Srdjan Antic",
            affiliation: "University of Connecticut, USA",
            topic:
              "S25-01	Studying physiological hallmarks of Alzheimer’s disease",
          },
          {
            name: "Marco Canepari",
            affiliation: "Université Grenoble Alpes et CNRS, France",
            topic:
              "S25-02	The function of the voltage-gated sodium channel Nav1.2 in physiology and pathology",
          },
          {
            name: "Dinko Mitrečić",
            affiliation: "University of Zagreb, Croatia",
            topic:
              "S25-03	Application of human brain organoids in neurodegeneration research",
          },
          {
            name: "Ana Cindrić",
            affiliation: "University of Zagreb, Croatia",
            topic:
              "S25-04	Sweet disruptions: N-glycosylation alterations in neuronal differentiation and trisomy 21",
          },
        ],
      },
      {
        id: "closing",
        title: "Closing Ceremony",
        startTime: new Date(Date.UTC(2025, 4, 21, 13, 0, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 13, 30, 0)),
        type: "ceremony",
      },
      {
        id: "farewell-dinner",
        title: "Farewell Dinner",
        startTime: new Date(Date.UTC(2025, 4, 21, 15, 30, 0)),
        endTime: new Date(Date.UTC(2025, 4, 21, 17, 30, 0)),
        type: "ceremony",
      },
    ],
  };

  const generateICSFile = (event) => {
    const startDate = formatDate(event.date, event.startTime);
    const endDate = formatDate(event.date, event.endTime);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `event-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTime = (date: Date) => {
    date = new Date(date.toLocaleString("en", { timeZone: "Europe/Athens" }));
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const EventCard = ({ event }) => {
    const isExpanded = expandedEventId === event.id;

    return (
      <div
        className={`border rounded-lg overflow-hidden transition-all duration-200 ${
          eventTypes[event.type]
        }`}
      >
        <div
          className="p-4 cursor-pointer hover:bg-opacity-90"
          onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{event.title}</h3>
                {event.speakers ? (
                  isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )
                ) : (
                  <div />
                )}
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="inline-block h-4 w-4 mr-1" />
                {typeof event.endTime !== "string" &&
                  getTime(event.startTime)}{" "}
                - {typeof event.endTime !== "string" && getTime(event.endTime)}
              </p>
              {event.location && (
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="inline-block h-4 w-4 mr-1" />
                  {event.location}
                </p>
              )}
            </div>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                generateICSFile(event);
              }}
              className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add to Calendar
            </button> */}
            <AddToCalendarButton {...event} />
          </div>
        </div>

        {isExpanded && (event.description || event.speakers) && (
          <div className="px-4 pb-4 bg-white bg-opacity-50">
            <div className="pt-2 border-t">
              {event.description && (
                <div className="mb-2">
                  <p className="text-sm text-gray-700">{event.description}</p>
                </div>
              )}
              {event.speakers &&
                Array.isArray(event.speakers) &&
                event.speakers
                  .filter((s) => s.hasOwnProperty("name"))
                  .map((s) => (
                    <div className="mb-2">
                      <p className="text-sm font-medium">{s.topic}</p>
                      <p className="text-sm text-gray-600">
                        <u>{s.name}</u>
                      </p>
                      <p className="text-sm text-gray-600">{s.affiliation}</p>
                    </div>
                  ))}
              {event.details && (
                <div className="mb-2">
                  <p className="text-sm font-medium">Additional Information:</p>
                  <p className="text-sm text-gray-600">{event.details}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardContent>
          <Tabs defaultValue="may-18" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="may-18">Sunday 18</TabsTrigger>
              <TabsTrigger value="may-19">Monday 19</TabsTrigger>
              <TabsTrigger value="may-20">Tuesday 20</TabsTrigger>
              <TabsTrigger value="may-21">Wednesday 21</TabsTrigger>
            </TabsList>

            {Object.entries(events).map(([date, dayEvents]) => (
              <TabsContent key={date} value={date} className="space-y-4">
                {dayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymposiumCalendar;