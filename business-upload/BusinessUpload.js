const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  connectDatabaseEmulator,
  ref,
  set,
  push,
  child,
  remove,
} = require("firebase/database");
const nameRule = /[^a-zA-Z]+/g;
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAEKa7Rtxg7IJ6DPEVXYMPFLyXTpAQNIJg",
  authDomain: "se-bpda-main-streets.firebaseapp.com",
  projectId: "se-bpda-main-streets",
  storageBucket: "se-bpda-main-streets.appspot.com",
  messagingSenderId: "769337411843",
  appId: "1:769337411843:web:67e00330318804c9970136",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// init business data

const setBusinessUpperCase = (business_name) => {
    const words = business_name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

const initBusinesses = async () => {
  const businesses = require("./data/MainStreet_BusinessList.json");
  
  for (const business of businesses) {
    const {
    //   FIELD1,
    //   NAICS_2017_6digit_code,
    //   NAICS_2017_6digit_desc,
    //   NAICS_2017_2digit_code,
    //   NAICS_2017_2digit_desc,
      ...businessData
    } = business;
    businessData.mainstreet = business.mainstreet.replace(nameRule, "-");
    businessData.business_name = setBusinessUpperCase(business.business_name);
    const key = push(child(ref(db), "business-new")).key;
    console.log(key);
    businessData.id = key;
    businessData['ZIP_code'] = businessData.zip;
   
    await set(
      ref(db, `business-new/${businessData.mainstreet}/${key}`),
      businessData
    );
    console.log(`${business.FIELD1} added`);
  }
  console.log("done");
};
// delete business data
const removeBusinesses = async () => {
  await remove(ref(db, "business2"));
  console.log("done");
};
// args 
const args = process.argv;
for (const arg of args) {
    console.log(arg);
  if (arg === "mock") {
    connectDatabaseEmulator(db, "localhost", 9000);
  } else if (arg === "init") {
    initBusinesses();
  } else if (arg === "remove") {
    removeBusinesses();
  } else {
    console.log("invalid arg");
  }
}