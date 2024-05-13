import { getCsrfToken, signIn } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
const API_BASE_URL = 'http://localhost:5000/api'; 
export default function SignIn({ csrfToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");


  const [license, setLicense] = useState("");
  const [speciality, setSpeciality] = useState("");


  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [labId, setLabId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(true);
  const [otptext, setOtptext] = useState();
  const [enteredotp, setEnteredotp] = useState();
  const [message, setMessage] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [remedies,setRemedies]= useState([]);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
  };

 /* const fetchDoctorsBySymptoms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors?symptoms=${symptoms}`);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };*/

  const renderDoctorsList = () => {
    if (doctors.length === 0) {
      return <p>No matching doctors found for the given symptoms.</p>;
    }

    return (
      <ul>
        {doctors.map((doctor, index) => (
          <li key={index}>
            <strong>{doctor.name}</strong> - {doctor.speciality}
          </li>
        ))}
      </ul>
    );
  };
  const handleGetRecommendedDoctors = async () => {
    try {
      // Simulate an API call with a delay
      setMessage('Fetching recommended doctors...');
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate a delay of 1.5 seconds

      // Mock response data (replace with actual API call)
      const mockDoctors = [
        { name: 'Dr. Smith', speciality: 'Cardiologist' },
        { name: 'Dr. Johnson', speciality: 'Dermatologist' },
        { name: 'Dr. Lee', speciality: 'Pediatrician' }
      ];

      setDoctors(mockDoctors);
      setMessage('Doctors recommended for your symptoms:');
    } catch (error) {
      console.error('Error fetching recommended doctors:', error);
      setMessage('Error fetching recommended doctors. Please try again.');
    }
  };
  const symptomDoctorMap = {
    'heart attack': [
      { name: 'Dr. Emily Johnson', specialization: 'General Practitioner' },
      { name: 'Dr. Peter Evans', specialization: 'Cardiologist' },
      { name: 'Dr. Michelle Hill', specialization: 'Emergency Medicine' }
    ],
    dehydration: [
      { name: 'Dr. Sarah Young', specialization: 'Internal Medicine' },
      { name: 'Dr. Thomas Carter', specialization: 'Nephrologist' },
      { name: 'Dr. Andrew Harris', specialization: 'Urologist' }
    ],
    'cold and flu': [
      { name: 'Dr. Jessica Brown', specialization: 'Internal Medicine' },
      { name: 'Dr. Michael Smith', specialization: 'Pulmonologist' },
      { name: 'Dr. David Wilson', specialization: 'Infectious Disease Specialist' }
    ],
    'eye , nose and ear problem': [
      { name: 'Dr. Sarah Davis', specialization: 'Otolaryngologist' },
      { name: 'Dr. Laura Taylor', specialization: 'Ophthalmologist' },
      { name: 'Dr. Jennifer Adams', specialization: 'Otolaryngologist' }
    ],
    migraine: [
      { name: 'Dr. Kimberly Adams', specialization: 'Neurologist' },
      { name: 'Dr. Eric Roberts', specialization: 'Headache Specialist' },
      { name: 'Dr. Michelle Hill', specialization: 'Pain Management Specialist' }
    ],
    allergy: [
      { name: 'Dr. Amanda Clark', specialization: 'Allergist' },
      { name: 'Dr. Mark Roberts', specialization: 'Dermatologist' },
      { name: 'Dr. Laura Taylor', specialization: 'Ophthalmologist' }
    ],
    'stomach ache': [
      { name: 'Dr. Lisa Martinez', specialization: 'Gastroenterologist' },
      { name: 'Dr. Steven White', specialization: 'Emergency Medicine' },
      { name: 'Dr. Rachel Thompson', specialization: 'General Surgeon' }
    ],
    'chest pain': [
      { name: 'Dr. Peter Evans', specialization: 'Cardiologist' },
      { name: 'Dr. Timothy Parker', specialization: 'Cardiologist' },
      { name: 'Dr. Sarah Young', specialization: 'Internal Medicine' }
    ],
    'weight loss': [
      { name: 'Dr. Samantha Nelson', specialization: 'Internal Medicine' },
      { name: 'Dr. Richard Walker', specialization: 'Diabetologist' },
      { name: 'Dr. Jessica Allen', specialization: 'Endocrinologist' }
    ],
    indigestion: [
      { name: 'Dr. Lisa Martinez', specialization: 'Gastroenterologist' },
      { name: 'Dr. Sarah Young', specialization: 'Internal Medicine' },
      { name: 'Dr. Amanda Clark', specialization: 'Allergist' }
    ],
    diabetes: [
      { name: 'Dr. Jessica Allen', specialization: 'Endocrinologist' },
      { name: 'Dr. Richard Walker', specialization: 'Diabetologist' },
      { name: 'Dr. Sarah Young', specialization: 'Internal Medicine' }
    ],
    tuberculosis: [
      { name: 'Dr. David Wilson', specialization: 'Infectious Disease Specialist' },
      { name: 'Dr. Sarah Young', specialization: 'Internal Medicine' },
      { name: 'Dr. Thomas Carter', specialization: 'Nephrologist' }
    ],
    cancer: [
      { name: 'Dr. Peter Evans', specialization: 'Oncologist' },
      { name: 'Dr. Laura Taylor', specialization: 'Ophthalmologist' },
      { name: 'Dr. Gregory Moore', specialization: 'Rheumatologist' }
    ],
    aids: [
      { name: 'Dr. David Wilson', specialization: 'Infectious Disease Specialist' },
      { name: 'Dr. Sarah Young', specialization: 'Internal Medicine' },
      { name: 'Dr. Thomas Carter', specialization: 'Nephrologist' }
    ],
    stroke: [
      { name: 'Dr. Kimberly Adams', specialization: 'Neurologist' },
      { name: 'Dr. Peter Evans', specialization: 'Cardiologist' },
      { name: 'Dr. David Wilson', specialization: 'Infectious Disease Specialist' }
    ],
    'lung problem': [
      { name: 'Dr. Michael Smith', specialization: 'Pulmonologist' },
      { name: 'Dr. Christopher Lee', specialization: 'Pulmonologist' },
      { name: 'Dr. Sarah Davis', specialization: 'Otolaryngologist' }
    ],
    'kidney problem': [
      { name: 'Dr. Andrew Harris', specialization: 'Urologist' },
      { name: 'Dr. Thomas Carter', specialization: 'Nephrologist' },
      { name: 'Dr. Lisa Martinez', specialization: 'Gastroenterologist' }
    ],
    'dizziness': [
      { name: 'Dr. Emily Johnson', speciality: 'General Practitioner' },
      { name: 'Dr. R p Banik', speciality: 'ENT Specialist' },
      { name: 'Dr. Abinandan Bhattacharjee', speciality: 'ENT Specialist' },
      {name: 'Dr. P C Sarma', speciality: 'Cardiologist'}
    ], 
    'runny nose': [
      { name: 'Dr. Emily Johnson', speciality: 'General Practitioner' },
      { name: 'Dr. Michael Smith', speciality: 'Pulmonologist' },
      { name: 'Dr. Sarah Davis',   speciality: 'Otolaryngologist' }
    ],
    'sore throat': [
      { name: 'Dr. Emily Johnson', speciality: 'General Practitioner' },
      { name: 'Dr. R p Banik', speciality: 'ENT Specialist' },
      { name: 'Dr. Sarah Davis', speciality: 'Otolaryngologist' }
    ],
    cough: [
      { name: 'Dr. Emily Johnson', speciality: 'General Practitioner' },
      { name: 'Dr. Michael Smith', speciality: 'Pulmonologist' },
      { name: 'Dr. R p Banik', speciality: 'ENT Specialist' },
    ],
    congestion: [
      { name: 'Dr. Michael Smith', speciality: 'Pulmonologist' },
      { name: 'Dr. Sarah Davis', speciality: 'Otolaryngologist' }
    ],
    'high fever': [
      { name: 'Dr. Emily Johnson', speciality: 'General Practitioner' },
      { name: 'Dr. David Wilson', speciality: 'Immunologist(Infectious Disease Specialist)' },
      { name: 'Dr. Kevin Anderson', speciality: 'Microbiologist' }
    ],
    'fever': [
      { name: 'Dr. David Wilson', speciality: 'Immunologist(Infectious Disease Specialist)' },
      { name: 'Dr. Kevin Anderson', speciality: 'Microbiologist' }
    ],
    'muscle aches': [
      { name: 'Dr. David Wilson', speciality: 'Immunologist(Infectious Disease Specialist)' },
      { name: 'Dr. Kunal Roy', speciality: 'Physiotherapist' }
    ],
    fatigue: [
      { name: 'Dr. David Wilson', speciality: 'Immunologist(Infectious Disease Specialist)' },
      { name: 'Dr. Kunal Roy', speciality: 'Physiotherapist' }
    ],
    headache: [
      { name: 'Dr. David Wilson', speciality: 'Immunologist(Infectious Disease Specialist)' }
    ],
    sneezing: [
      { name: 'Dr. Amanda Clark', speciality: 'Allergist' },
      { name: 'Dr. R p Banik', speciality: 'ENT Specialist' }
    ],
    'itching eyes': [
      { name: 'Dr. Amanda Clark', speciality: 'Allergist' }
    ],
    'nasal congestion': [
      { name: 'Dr. Amanda Clark', speciality: 'Allergist' },
      { name: 'Dr. R p Banik', speciality: 'ENT Specialist' }
    ],
    'skin rash': [
      { name: 'Dr. Mark Roberts', speciality: 'Dermatologist' }
    ],
    'shortness of breath': [
      { name: 'Dr. Christopher Lee', speciality: 'Pulmonologist' }
    ],
    wheezing: [
      { name: 'Dr. Christopher Lee', speciality: 'Pulmonologist' }
    ],
    'chest tightness': [
      { name: 'Dr. Christopher Lee', speciality: 'Pulmonologist' }
    ],
    coughing: [
      { name: 'Dr. Christopher Lee', speciality: 'Pulmonologist' },
      { name: 'Dr. R p Banik', speciality: 'ENT Specialist' }
    ],
    diarrhea: [
      { name: 'Dr. Lisa Martinez', speciality: 'Gastroenterologist' }
    ],
    'abdominal cramps': [
      { name: 'Dr. Lisa Martinez', speciality: 'Gastroenterologist' }
    ],
    nausea: [
      { name: 'Dr. Lisa Martinez', speciality: 'Gastroenterologist' }
    ],
    vomiting: [
      { name: 'Dr. Lisa Martinez', speciality: 'Gastroenterologist' }
    ],
    'frequent urination': [
      { name: 'Dr. Andrew Harris', speciality: 'Urologist' }
    ],
    'burning sensation while urinating': [
      { name: 'Dr. Andrew Harris', speciality: 'Urologist' }
    ],
    'cloudy urine': [
      { name: 'Dr. Andrew Harris', speciality: 'Urologist' }
    ],
    'severe headache': [
      { name: 'Dr. Kimberly Adams', speciality: 'Neurologist' }
    ],
    'sensitivity to light and sound': [
      { name: 'Dr. Kimberly Adams', speciality: 'Neurologist' }
    ],
    'excessive thirst': [
      { name: 'Dr. Jessica Allen', speciality: 'Endocrinologist' },
      { name: 'Dr. P K Roy', speciality: 'Endocrinologist' }
    ],
    'blurred vision': [
      { name: 'Dr. Abinandan Bhattacharjee', speciality: 'ENT Specialist' },
      { name: 'Dr. Jessica Allen', speciality: 'Endocrinologist' }
    ],
    'joint pain': [
      { name: 'Dr. Gregory Moore', speciality: 'Rheumatologist' },
      { name: 'Dr. Kunal Roy', speciality: 'Physiotherapist' }
    ],
    stiffness: [
      { name: 'Dr. Gregory Moore', speciality: 'Rheumatologist' }
    ],
    swelling: [
      { name: 'Dr. Gregory Moore', speciality: 'Rheumatologist' }
    ],
    'decreased range of motion': [
      { name: 'Dr. Olivia Baker', speciality: 'Orthopedic Surgeon' }
    ]
  };
  
  const symptomRemediesMap = {

    'runny nose': [
      'Stay hydrated by drinking plenty of fluids like water, herbal teas, or clear broths.',
      'Use saline nasal sprays or rinses to help clear nasal passages.',
      'Consider using a humidifier to add moisture to the air, especially during dry conditions.',
      'Rest and avoid exposure to allergens or irritants that may worsen symptoms.'
    ],
    'sore throat': [
      'Gargle with warm salt water to soothe a sore throat.',
      'Drink warm beverages like tea with honey or lemon.',
      'Use throat lozenges or hard candies to help relieve throat irritation.',
      'Avoid smoking and exposure to smoke or other pollutants.'
    ],
    cough: [
      'Drink warm liquids to help soothe the throat and loosen mucus.',
      'Use honey or cough syrup to suppress coughing (consult with a doctor for children under 1 year).',
      'Avoid irritants such as smoke, strong odors, or allergens.'
    ],
    congestion: [
      'Inhale steam from a bowl of hot water to help loosen mucus and clear nasal passages.',
      'Use saline nasal sprays or drops to moisturize and decongest nasal passages.',
      'Apply warm compresses to the face to relieve sinus pressure.',
      'Elevate your head while sleeping to promote drainage.'
    ],
    'high fever': [
      'Stay hydrated with water, clear broths, or electrolyte drinks.',
      'Take over-the-counter fever reducers like acetaminophen or ibuprofen (follow dosage instructions).',
      'Rest and avoid excessive physical activity.'
    ],
    'muscle aches': [
      'Apply a warm compress or heating pad to the affected muscles.',
      'Take a warm bath with Epsom salts to relax muscles.',
      'Rest and avoid strenuous activities that may exacerbate muscle pain.'
    ],
    fatigue: [
      'Ensure you are getting adequate rest and sleep.',
      'Maintain a balanced diet with nutritious foods.',
      'Engage in light physical activity or gentle stretching to boost energy levels.'
    ],
    headache: [
      'Apply a cold compress or ice pack to the forehead or temples.',
      'Rest in a quiet, dark room to reduce sensory stimulation.',
      'Stay hydrated and avoid triggers such as caffeine or certain foods.'
    ],
    'heart attack': [
      'Call emergency services immediately (911 or local emergency number).',
      'Chew and swallow aspirin if advised by a healthcare provider.',
      'Stay calm and lie down while awaiting medical help.'
    ],
    dehydration: [
      'Drink small sips of water or oral rehydration solutions (ORS).',
      'Avoid caffeine and alcoholic beverages that can worsen dehydration.',
      'Seek medical attention if symptoms persist or are severe.'
    ],
    'cold and flu': [
      'Get plenty of rest to support the immune system.',
      'Stay hydrated with fluids like water, herbal teas, or broths.',
      'Take over-the-counter medications for symptom relief (consult with a pharmacist or doctor).'
    ],
    'eye , nose and ear problem': [
      'Avoid touching or rubbing the affected area to prevent further irritation.',
      'Use prescribed eye drops, nasal sprays, or ear drops as directed by a healthcare provider.',
      'Protect eyes from bright lights and wear sunglasses outdoors if sensitive to light.'
    ],
    migraine: [
      'Rest in a quiet, dark room to alleviate symptoms.',
      'Apply a cold compress or ice pack to the forehead or neck.',
      'Take prescribed migraine medications as recommended by a doctor.'
    ],
    allergy: [
      'Identify and avoid allergens triggering symptoms.',
      'Use over-the-counter antihistamines or nasal sprays for symptom relief.',
      'Consider allergy testing and consult with an allergist for personalized treatment.'
    ],
    'stomach ache': [
      'Eat bland foods like bananas, rice, applesauce, and toast (BRAT diet).',
      'Avoid spicy, greasy, or heavy meals that may exacerbate stomach discomfort.',
      'Use over-the-counter antacids or medications for indigestion relief.'
    ],
    'chest pain': [
      'Seek immediate medical attention (call 911) as chest pain may indicate a serious condition like a heart attack.',
      'Stay calm and rest while waiting for emergency services.',
      'Avoid exertion or physical activity that may worsen chest pain.'
    ],
    'vomiting': [
      'Eat bland foods like bananas, rice, applesauce, and toast (BRAT diet).',
      'Avoid spicy, greasy, or heavy meals that may exacerbate stomach discomfort.',
      'Use over-the-counter antacids or medications for indigestion relief.'
    ],
    'weight loss': [
      'Maintain a balanced diet with sufficient calories and nutrients.',
      'Engage in regular physical activity or exercise to support healthy weight management.',
      'Consult with a healthcare provider for personalized guidance on weight loss.'
    ],
    indigestion: [
      'Eat smaller, more frequent meals to avoid overloading the digestive system.',
      'Avoid lying down immediately after eating to reduce reflux symptoms.',
      'Use over-the-counter antacids or medications for relief from indigestion.'
    ],
    diabetes: [
      'Monitor blood sugar levels regularly and follow prescribed treatment plans.',
      'Adopt a healthy diet rich in fruits, vegetables, and whole grains.',
      'Engage in regular physical activity and maintain a healthy weight.'
    ],
    tuberculosis: [
      'Follow prescribed antibiotic treatment for the full duration as directed by a healthcare provider.',
      'Cover mouth and nose when coughing or sneezing to prevent transmission.',
      'Get adequate rest and nutrition to support recovery.'
    ],
    cancer: [
      'Consult with oncologists and specialists for personalized treatment options.',
      'Follow prescribed cancer treatment plans including chemotherapy, radiation, or surgery.',
      'Seek emotional support and resources from cancer support groups.'
    ],
    aids: [
      'Adhere to antiretroviral therapy (ART) treatment regimen as directed by healthcare providers.',
      'Practice safe sex and use barrier methods to prevent transmission of HIV.',
      'Seek counseling and support services for managing HIV/AIDS.'
    ],
    stroke: [
      'Recognize stroke symptoms (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services).',
      'Call emergency services immediately (911 or local emergency number).',
      'Stay with the individual and keep them calm while awaiting medical help.'
    ],
    'lung problem': [
      'Quit smoking and avoid exposure to secondhand smoke or other lung irritants.',
      'Use prescribed inhalers or medications as directed by a pulmonologist.',
      'Maintain good indoor air quality with proper ventilation and air filtration.'
    ],
    'kidney problem': [
      'Stay hydrated by drinking plenty of water (unless advised otherwise by a healthcare provider).',
      'Follow dietary recommendations to support kidney health (low-sodium, balanced diet).',
      'Monitor blood pressure and kidney function regularly as recommended.'
    ]
    // Add more symptoms and corresponding home remedies advice as needed
  };

  
  

  const fetchDoctorsBySymptoms = async () => {
    try {
      // Trim and convert symptoms to lowercase
      const formattedInput = symptoms.trim().toLowerCase();
  
      // Check if symptoms are empty or whitespace
      if (!formattedInput) {
        setDoctors([]); // Set doctors list to empty array
        return; // No input symptoms provided
      }
  
      // Split input symptoms into individual words
      const inputWords = formattedInput.split(/\s+/);
  
      // Initialize an array to collect all matching doctors
      let matchedDoctors = [];
  
      // Iterate over each symptom in symptomDoctorMap
      for (const symptom in symptomDoctorMap) {
        // Skip if the symptom is not defined or empty
        if (!symptom || typeof symptom !== 'string') {
          continue;
        }
  
        // Split mapped symptom into individual words
        const mappedWords = symptom.trim().toLowerCase().split(/\s+/);
  
        // Check if any input word matches with mapped symptom words
        const isMatched = inputWords.some(word => mappedWords.includes(word));
  
        // If there is a match, add corresponding doctors to the result
        if (isMatched) {
          matchedDoctors = [...matchedDoctors, ...symptomDoctorMap[symptom]];
        }
      }
  
      // Set the state with the matched doctors
      setDoctors(matchedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]); // Clear doctors list in case of error
    }
  };
  
  
  
  // const fetchRemediesBySymptoms = async () => {
  //   try {
  //     if (!symptoms.trim()) {
  //       return; // Do not proceed if symptoms are empty or whitespace
  //     }
  
  //     const formattedSymptoms = symptoms.toLowerCase().trim();
  //     const matchingRemedies = symptomRemediesMap[formattedSymptoms];
  
  //     if (!matchingRemedies || matchingRemedies.length === 0) {
  //       setRemedies([]);
  //       return; // No matching doctors found for the given symptoms
  //     }
  
  //     setRemedies(matchingRemedies);
  //     console.log("Here are some recommended remedies for your symptoms.");
  //   } catch (error) {
  //     console.error('Error fetching doctors:', error);
  //     setRemedies([]); // Clear doctors list in case of error
  //   }
  // };


  const fetchRemediesBySymptoms = async () => {
    try {
      // Trim and convert symptoms to lowercase
      const formattedInput = symptoms.trim().toLowerCase();
  
      // Check if symptoms are empty or whitespace
      if (!formattedInput) {
        setRemedies([]); // Set remedies list to empty array
        return; // No input symptoms provided
      }
  
      // Split input symptoms into individual words
      const inputWords = formattedInput.split(/\s+/);
  
      // Initialize an array to collect all matching remedies
      let matchedRemedies = [];
  
      // Iterate over each symptom in symptomRemediesMap
      for (const symptom in symptomRemediesMap) {
        // Skip if the symptom is not defined or empty
        if (!symptom || typeof symptom !== 'string') {
          continue;
        }
  
        // Split mapped symptom into individual words
        const mappedWords = symptom.trim().toLowerCase().split(/\s+/);
  
        // Check if any input word matches with mapped symptom words
        const isMatched = inputWords.some(word => mappedWords.includes(word));
  
        // If there is a match, add corresponding remedies to the result
        if (isMatched) {
          matchedRemedies = [...matchedRemedies, ...symptomRemediesMap[symptom]];
        }
      }
  
      // Set the state with the matched remedies
      setRemedies(matchedRemedies);
      setShowRecommendation(true);
      console.log("Here are some recommended remedies for your symptoms.");
    } catch (error) {
      console.error('Error fetching remedies:', error);
      setRemedies([]); // Clear remedies list in case of error
      setShowRecommendation(false);
    }
  };
  
  
  function generateOTP() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
  }


  const signinUser = async (e) => {
    e.preventDefault();
    let options = {
      redirect: false,
      email,
      name,
      firstname,
      lastname,
      phone,
      role,
      password,
    };
    const res = await signIn("credentials", options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    } else {
      return Router.push("/profile");
    }
  };
  const signupPatient = async (e) => {
    e.preventDefault();
    if (otptext != enteredotp) {
      setMessage("Wrong OTP");
      return;
    }
    setMessage(null);
    const res = await fetch("/api/registerpatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        phone,
        role: "patient",
        password,
      }),
    }) ;
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message == "Registered successfully") {
      let options = {
        redirect: false,
        email,
        firstname,
        lastname,
        phone,
        role: "patient",
        password,
      };
      setRole("patient");
      const res = await signIn("credentials", options);
      return Router.push("/profile");
    }
  };
  const signupDoctor = async (e) => {
    e.preventDefault();
    if (otptext != enteredotp) {
      setMessage("Wrong OTP");
      return;
    }
    setMessage(null);

    const res = await fetch("/api/registerdoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        gender,
        license,
        speciality,
        city,
        phone,
        role: "doctor",
        password,
      }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message == "Registered successfully") {
      let options = {
        redirect: false,
        email,
        firstname,
        lastname,
        gender,
        license,
        speciality,
        city,
        phone,
        role: "doctor",
        password,
      };
      setRole("doctor");
      const res = await signIn("credentials", options);
      return Router.push("/profile");
    }
  };
  const signupLab = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/registerlab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        type,
        phone,
        role: "lab",
        password,
      }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message == "Registered successfully") {
      let options = {
        redirect: false,
        email,
        name,
        type,
        phone,
        role: "lab",
        password,
      };
      const res = await signIn("credentials", options);
      setRole("lab");
      return Router.push("/");
    }
  };
  const sendotp = async (e) => {
    const otpnum = generateOTP();
    const number = "91" + phone
    const chatid = `${number}@c.us`
    const msg = `Your OTP is ${otpnum}`
    console.log(otpnum);
    const res = await fetch("https://api.green-api.com/waInstance7103832087/sendMessage/9037e1378e404f429d9b24934c7282c7786a8e8a0ef14ee294", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatid,
        message: msg,
      }),
    });
    console.log(otpnum);
    setOtptext(otpnum);
    setOtp(false);
  }
  const [activeTab, setActiveTab] = useState("signin");
  return (
    // method="post" action="/api/auth/callback/credentials"
    <>

      <section className="gradient-form min-h-screen bg-white-200 dark:bg-neutral-700" >

        <div className="container  h-full pt-5 pb-5 pr-[204px] pl-[204px]">

          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div
                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <Tabs value="signin" id="custom-animation">
                  <TabsHeader className=" h-12 font-bold " >
                    <Tab className={`${activeTab === "signin" ? "bg-white text-black " : ""} m-auto grid items-center cursor-pointer hover:bg-white hover:text-black`} value="signin" onClick={() => setActiveTab("signin")}>
                      Sign In
                    </Tab>
                    <Tab className={`${activeTab === "patientregister" ? "bg-white text-black" : ""} m-auto grid items-center cursor-pointer hover:bg-white hover:text-black`} value="patientregister" onClick={() => setActiveTab("patientregister")}>
                      AS Patient
                    </Tab>
                    <Tab className={`${activeTab === "doctorregister" ? "bg-white text-black" : ""} m-auto grid items-center cursor-pointer hover:bg-white hover:text-black`} value="doctorregister" onClick={() => setActiveTab("doctorregister")}>
                      AS Doctor
                    </Tab>
                    <Tab className={`${activeTab === "labregister" ? "bg-white text-black" : ""} m-auto grid items-center cursor-pointer hover:bg-white hover:text-black`} value="labregister" onClick={() => setActiveTab("labregister")}>
                      AS Lab Worker
                    </Tab>
                    <Tab className={`${activeTab === "engineerRegister" ? "bg-white text-black" : ""} m-auto grid items-center cursor-pointer hover:bg-white hover:text-black`} value="engineerRegister" onClick={() => setActiveTab("engineerRegister")}>
                      AS Engineer
                    </Tab>
                    <Tab className={`${activeTab === "recommendationpage" ? "bg-white text-black" : ""} m-auto grid items-center cursor-pointer hover:bg-white hover:text-black`} value="recommendationpage" onClick={() => setActiveTab("recommendationpage")}>
                    Home Health Tips
                    </Tab>
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel value="signin">
                      {/* Sign In */}
                      <div className="g-0 lg:flex lg:flex-wrap">
                        <div className="mx-auto lg:w-6/12 px-4 md:px-0" >

                          <div className="md:mx-6 md:p-12 ">
                            {/* <!--Logo--> */}
                            <div className= "mx-auto text-center">
                              <img
                                className="mx-auto w-48 mt-2"
                                src="../images/mededg_logo2.png"
                                alt="logo" />
                              <h4 className="mb-6 mt-3  text-2xl font-semibold text-gray-800">
                                Welcome To <span className="text-blue-400">MedEdge!</span>
                              </h4>
                            </div>
                            <form>
                              <p className="mb-4 text-gray-600">Login to your account</p>
                              <div className="relative mb-4" data-te-input-wrapper-init>
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                <label className="text-black-400 ">
                                  Email
                                  <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your Gmail"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </label>
      

                                <label className="text-black-400 ">
                                  Password
                                  <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    name="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                </label>
                                <p style={{ color: "red" }}>{message}</p>
                                <button
                                  className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                  type="submit" onClick={(e) => signinUser(e)}>
                                  Sign In
                                </button>
                              </div>

                              <div className="flex items-center justify-between pb-6">
                                <p className="mb-0 mr-2">New here? <span className="text-red-600">Register Now.</span></p>


                              </div>
                            </form>
                          </div>
                        </div>
                        <div
                          className="flex items-center bg-gradient-to-r from-lime-400 to-green-500"
                        >
                          <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                          <h4 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Arial', fontSize: 22 }}>
                              Explore MedEdge
                            </h4>
                            <p className="text-sm" style={{ fontFamily: 'Times New Roman', fontSize: 18 }}>
                            Welcome to MedEdge!🌟 Whether you're a doctor, patient, lab worker, or student, 
                            sign in to unlock a world of healthcare innovation. Your journey towards better health starts here. 
                            Join us in shaping the future of medical excellence. Let's get started together!
                            </p>
                          </div>
                        </div>

                      </div>
                    </TabPanel>
                    <TabPanel value="patientregister">
                      {/* Register as a Patient */}
                      <div className="g-0 lg:flex lg:flex-wrap">
                        <div className="mx-auto lg:w-6/12 px-4 md:px-0">

                          <div className="md:mx-6 md:p-12">
                            {/* <!--Logo--> */}
                            <div className="text-center">
                              <img
                                className="mx-auto w-48 mt-1"
                                src="../images/mededg_logo2.png"
                                alt="logo" />
                              <h4 className="mb-3 mt-3 pb-1 text-xl font-semibold">
                                Welcome To <span className="text-blue-400 font-sans-serif">MedEdge!</span>
                              </h4>
                            </div>
                            <p className="mb-4">Register and Start </p>
                            <div className="relative mb-4" data-te-input-wrapper-init>
                              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                              <label className="text-black-400 ">
                                Email
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="email"
                                  type="email"
                                  placeholder="Enter your Gmail"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                First Name
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="firstname"
                                  type="text"

                                  onChange={(e) => setFirstname(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Last Name
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="lastname"
                                  type="text"

                                  onChange={(e) => setLastname(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Phone Number
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="phone"
                                  type="text"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </label>

                              <label className="text-black-400 ">
                                Password
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="password"
                                  type="password"
                                  placeholder="Enter Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </label>


                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                onClick={(e) => sendotp(e)}>
                                Send OTP
                              </button>

                              <label className="text-black-400 ">
                                OTP
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  disabled={otp}
                                  name="otp"
                                  type="password"
                                  onChange={(e) => setEnteredotp(e.target.value)}
                                />
                              </label>

                              <p style={{ color: "red" }}>{message}</p>

                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                disabled={otp} onClick={(e) => signupPatient(e)}>
                                Sign up as Patient
                              </button>
                            </div>

                            <div className="flex items-center justify-between pb-6">
                              <p className="mb-0 mr-2">Already have an Account! <span className="text-red-600">Sign In</span></p>


                            </div>
                          </div>
                        </div>
                        <div
                          className=" items-center bg-gradient-to-r from-lime-400 to-green-500"
                        >
                          <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                            <h4 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Arial', fontSize: 22 }}>
                              Register as a Patient
                            </h4>
                            <p className="text-sm" style={{ fontFamily: 'Times New Roman', fontSize: 18 }}>
                            At MedEdge, where your health takes center stage! As a registered patient, you're now part of a community dedicated to your well-being. 
                            Your journey to better health begins here, and we're here to support you every step of the way.
                            </p>
                            
                          </div>

                          <div className="px-4 py-6 text-black md:mx-6 md:p-12">
          <h3 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Times New Roman', fontSize: 18 }}>
            Enter Symptoms:</h3>
            <input
              className="block w-full rounded border-gray-400 bg-transparent px-3 py-2 outline-none"
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., headache, fever, cough"
            />
          
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={fetchDoctorsBySymptoms}
          >
            Get Recommended Doctors
          </button>

          {/* Display recommended doctors */}
          {message && <p className="mt-4 mb-2">{message}</p>}
          <ul>
            {doctors.map((doctor, index) => (
              <li key={index}>{doctor.name} - {doctor.speciality}</li>
            ))}
          </ul>
        </div>
                        </div>

                      </div>
                    </TabPanel>

                    <TabPanel value="doctorregister">
                      {/* Register as a doctor */}
                      
                      <div className="g-0 lg:flex lg:flex-wrap">
                        <div className="mx-auto lg:w-6/12 px-4 md:px-0">

                          <div className="md:mx-6 md:p-12">
                            {/* <!--Logo--> */}
                            <div className="text-center">
                              <img
                                className="mx-auto w-48 mt-1"
                                src="../images/mededg_logo2.png"
                                alt="logo" />
                              <h4 className="mb-3 mt-3 pb-1 text-xl font-semibold">
                                Welcome To <span className="text-blue-400 font-sans-serif">MedEdge!</span>
                              </h4>
                            </div>
                            <p class="mb-4">Register and Start </p>
                            <div class="relative mb-4" data-te-input-wrapper-init>
                              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                              <label className="text-black-400 ">
                                Email
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="email"
                                  type="email"
                                  placeholder="Enter your Gmail"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                First Name
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="firstname"
                                  type="text"

                                  onChange={(e) => setFirstname(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Last Name
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="lastname"
                                  type="text"

                                  onChange={(e) => setLastname(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Gender
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="gender"
                                  type="text"

                                  onChange={(e) => setGender(e.target.value)}
                                />
                              </label>


                              <label className="text-black-400 ">
                                Medical License Number
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="license"
                                  type="text"
                                  onChange={(e) => setLicense(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Specialist In
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="speciality"
                                  type="text"

                                  onChange={(e) => setSpeciality(e.target.value)}
                                />
                              </label>


                              <label className="text-black-400 ">
                                City
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="city"
                                  type="text"

                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Phone Number
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="phone"
                                  type="text"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </label>

                              <label className="text-black-400 ">
                                Password
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="password"
                                  type="password"
                                  placeholder="Enter Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </label>


                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                onClick={(e) => sendotp(e)}>
                                Send OTP
                              </button>

                              <label className="text-black-400 ">
                                OTP
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  disabled={otp}
                                  name="otp"
                                  type="password"
                                  onChange={(e) => setEnteredotp(e.target.value)}
                                />
                              </label>

                              <p style={{ color: "red" }}>{message}</p>

                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                disabled={otp} onClick={(e) => signupDoctor(e)}>
                                Sign up as doctor
                              </button>
                            </div>

                            <div className="flex items-center justify-between pb-6">
                              <p className="mb-0 mr-2">Already have an Account!<span className="text-red-600">Sign In.</span></p>


                            </div>
                          </div>
                        </div>
                        <div
                          className="flex items-center bg-gradient-to-r from-lime-400 to-green-500"
                        >
                          <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                            <h4 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Arial', fontSize: 22 }}>
                            Register as a Doctor
                            </h4>
                            <p className="text-sm" style={{ fontFamily: 'Times New Roman', fontSize: 18 }}>
                            At MedEdge, where healing meets innovation! 
                            We're thrilled to have you on board as a registered doctor. 
                            Your expertise is a valuable addition to our community, 
                            and we look forward to advancing healthcare together.
                            </p>
                          </div>
                        </div>

                      </div>
                    </TabPanel>
                    <TabPanel value="labregister">
                      {/* Register as a Lab */}
                      <div className="g-0 lg:flex lg:flex-wrap">
                        <div className="mx-auto lg:w-6/12 px-4 md:px-0">

                          <div className="md:mx-6 md:p-12">
                            {/* <!--Logo--> */}
                            <div className="text-center">
                              <img
                                className="mx-auto w-48 mt-1"
                                src="../images/mededg_logo2.png"
                                alt="logo" />
                              <h4 className="mb-3 mt-3 pb-1 text-xl font-semibold">
                                Welcome To <span className="text-blue-400 font-sans-serif">MedEdge!</span>
                              </h4>
                            </div>
                            <p className="mb-4">Register and Start </p>
                            <div class="relative mb-4" data-te-input-wrapper-init>
                              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                              <label className="text-black-400 ">
                                Email
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="email"
                                  type="email"
                                  placeholder="Enter your Gmail"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Name
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="name"
                                  type="text"

                                  onChange={(e) => setName(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Type
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="type"
                                  type="text"

                                  onChange={(e) => setType(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Lab License I'd
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="labId"
                                  type="text"

                                  onChange={(e) => setLabId(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Phone Number
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="phone"
                                  type="text"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </label>

                              <label className="text-black-400 ">
                                Password
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="password"
                                  type="password"
                                  placeholder="Enter Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </label>


                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                onClick={(e) => sendotp(e)}>
                                Send OTP
                              </button>

                              <label className="text-black-400 ">
                                OTP
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  disabled={otp}
                                  name="otp"
                                  type="password"
                                  onChange={(e) => setEnteredotp(e.target.value)}
                                />
                              </label>

                              <p style={{ color: "red" }}>{message}</p>

                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                disabled={otp} onClick={(e) => signupLab(e)}>
                                Sign up as Lab
                              </button>
                            </div>

                            <div className="flex items-center justify-between pb-6">
                              <p className="mb-0 mr-2">Already have an Account!<span className="text-red-600"> Sign In </span></p>


                            </div>
                          </div>
                        </div>
                        <div
                          className="flex items-center bg-gradient-to-r from-lime-400 to-green-500"
                        >
                          <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                            <h4 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Arial', fontSize: 22 }}>
                              Register as a Lab worker
                            </h4>
                            <p className="text-sm" style={{ fontFamily: 'Times New Roman', fontSize: 18 }}>
                            At MedEdge, where precision and care intersect in the world of 
                            diagnostics! As a registered Lab Worker, your expertise adds a critical 
                            dimension to our commitment to healthcare excellence. 
                            Let's work together to advance medical diagnostics and improve lives.
                            </p>
                          </div>
                        </div>

                      </div>
                    </TabPanel>


                    <TabPanel value="engineerRegister">
                      {/* Register as a Lab */}
                      <div className="g-0 lg:flex lg:flex-wrap">
                        <div className="mx-auto lg:w-6/12 px-4 md:px-0">

                          <div className="md:mx-6 md:p-12">
                            {/* <!--Logo--> */}
                            <div className="text-center">
                              <img
                                className="mx-auto w-48 mt-1"
                                src="../images/mededg_logo2.png"
                                alt="logo" />
                              <h4 className="mb-3 mt-3 pb-1 text-xl font-semibold">
                                Welcome To <span className="text-blue-400 font-sans-serif">MedEdge!</span>
                              </h4>
                            </div>
                            <p className="mb-4">Register and Start </p>
                            <div class="relative mb-4" data-te-input-wrapper-init>
                              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                              <label className="text-black-400 ">
                                Email
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="email"
                                  type="email"
                                  placeholder="Enter your Gmail"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Name
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="name"
                                  type="text"

                                  onChange={(e) => setName(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Gender
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="gender"
                                  type="text"

                                  onChange={(e) => setType(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Professional Background
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="professBg"
                                  type="text"

                                  onChange={(e) => setLabId(e.target.value)}
                                />
                              </label>
                              <label className="text-black-400 ">
                                Phone Number
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="phone"
                                  type="text"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </label>

                              <label className="text-black-400 ">
                                Password
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  name="password"
                                  type="password"
                                  placeholder="Enter Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </label>


                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                onClick={(e) => sendotp(e)}>
                                Send OTP
                              </button>

                              <label className="text-black-400 ">
                                OTP
                                <input className=" peer block min-h-[auto] w-full rounded border-2 border-gray-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                  disabled={otp}
                                  name="otp"
                                  type="password"
                                  onChange={(e) => setEnteredotp(e.target.value)}
                                />
                              </label>

                              <p style={{ color: "red" }}>{message}</p>

                              <button
                                className="mb-3 mt-5 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xl font-medium bg-gradient-to-r from-lime-500 to-green-500 leading-normal text-black shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                disabled={otp} onClick={(e) => signupLab(e)}>
                                Sign up as an Engineer
                              </button>
                            </div>

                            <div className="flex items-center justify-between pb-6">
                              <p className="mb-0 mr-2">Already have an Account!<span className="text-red-600"> Sign In </span></p>


                            </div>
                          </div>
                        </div>
                        <div
                          className="flex items-center bg-gradient-to-r from-lime-400 to-green-500"
                        >
                          <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                            <h4 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Arial', fontSize: 22 }}>
                              Register as an Engineer
                            </h4>
                            <p className="text-sm" style={{ fontFamily: 'Times New Roman', fontSize: 18 }}>
                            Engineers, ready to innovate in healthcare? Register now to explore medical 
                            materials and technologies, collaborating on life-saving solutions. 
                            Join our community driving healthcare forward through engineering. 
                            Unlock a world of possibilities at the intersection of technology and medicine.
                            </p>
                          </div>
                        </div>

                      </div>
                    </TabPanel>
                    <TabPanel value="recommendationpage">
                    <div className="flex flex-col justify-center items-center px-4 py-6 text-black md:mx-6 md:p-12" >
                    <img
          src="../images/home remedy1.png"
          alt="Home Remedy"
          style={{ maxWidth: '80%', maxHeight: '320px', marginBottom: '0.1px' }}
/>
                      {/* Introductory paragraph */}
                      <p
        className="mb-6 text-xl font-semibold"
        style={{
          fontFamily: 'Georgia, serif', // Example of using a serif font like Georgia
          fontSize: 22,
          lineHeight: '1.5',
          color: '#333', // Example of setting text color
          marginTop: '80px',
        }}
      >
        Discover effective home remedies for common health concerns. From everyday kitchen remedies to herbal solutions,
        our DIY tips offer natural relief at your fingertips. Enter your symptoms below to access personalized advice and
        take steps towards better wellness effortlessly.
      </p>
                        <h3 className="mb-6 text-xl font-semibold" style={{ fontFamily: 'Times New Roman', fontSize: 22 }}>
                         Enter Symptoms:</h3>
                         <div className="justify-center items-center">
                         <input
                          className="block w-full rounded border-gray-400 bg-transparent px-3 py-2 outline-none"
                          type="text"
                           value={symptoms}
                           onChange={(e) => setSymptoms(e.target.value)}
                           placeholder="E.g., headache, fever, cough"
                            />
                            </div>
          
          <button
            className="text-black font-bold bg-gradient-to-r from-lime-500 to-green-500 py-2 px-4 rounded mt-2"
            onClick={fetchRemediesBySymptoms}
          >
            Get Recommended Remedies
          </button>

          {/* Display recommended remedies */}
        {/* <h2 className="mt-8 mb-4 text-xl font-semibold" style={{ fontFamily: 'Times New Roman', fontSize: 20 }}>
          Recommended Home Remedies:
        </h2> */}
        {showRecommendation && <p className="mt-8 mb-4 text-xl font-semibold" style={{ fontFamily: 'Times New Roman', fontSize: 24}}>Here are some recommended Home Remedies:</p>}
        <ul className="mt-8 mb-4 text-xl font-semibold" style={{ fontFamily: 'Times New Roman', fontSize: 22 }}>
       
          {remedies.map((remedy, index) => (
            <li key={index}>{remedy}</li>
            
          ))}
          <li>{}</li>
        </ul>
          
        </div>
                        
                    </TabPanel>
                    
                  </TabsBody>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
