const TimeCredit = require('./timecredit.model');

exports.initial = async function() {
  new TimeCredit({
    type: 20,
    minAge: 0,
    minCareer: 5,
    minCareerAM: 2,
    MaxMonths: 60,
    minMonths: 6,
    Comp5Min: 158.38,
    Comp5Plus: 204.39
  }).save();
  new TimeCredit({
    type: 50,
    minAge: 0,
    minCareer: 5,
    minCareerAM: 2,
    MaxMonths: 24,
    minMonths: 6,
    Comp5Min: 240.51,
    Comp5Plus: 320.68
  }).save();
  new TimeCredit({
    type: 100,
    minAge: 0,
    minCareer: 5,
    minCareerAM: 2,
    MaxMonths: 12,
    minMonths: 6,
    Comp5Min: 481.02,
    Comp5Plus: 641.37
  }).save();


  new TimeCredit({
    type: 50,
    minAge: 55,
    minCareer: 25,
    minCareerAM: 2,
    minMonths: 6,
    Comp5Min: 479.06,
    Comp5Plus: 479.06
  }).save();
  new TimeCredit({
    type: 20,
    minAge: 55,
    minCareer: 25,
    minCareerAM: 2,
    minMonths: 6,
    Comp5Min: 268.53,
    Comp5Plus: 268.53
  }).save();

  new TimeCredit({
    type: 20,
    minAge: 50,
    minCareer: 25,
    minCareerAM: 2,
    minMonths: 6,
    Comp5Min: 204.39,
    Comp5Plus: 204.39
  }).save();


  new TimeCredit({
    type: 20,
    minAge: 0,
    motivation: 'Type1.Child8j',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 6,
    Comp5Min: 158.38,
    Comp5Plus: 204.39
  }).save();
  new TimeCredit({
    type: 50,
    minAge: 0,
    motivation: 'Type1.Child8j',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 6,
    Comp5Min: 240.51,
    Comp5Plus: 320.68
  }).save();
  new TimeCredit({
    type: 100,
    minAge: 0,
    motivation: 'Type1.Child8j',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 6,
    Comp5Min: 481.02,
    Comp5Plus: 641.37
  }).save();

  new TimeCredit({
    type: 20,
    minAge: 0,
    motivation: 'Type1.Palliative',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 1,
    Comp5Min: 158.38,
    Comp5Plus: 204.39
  }).save();
  new TimeCredit({
    type: 50,
    minAge: 0,
    motivation: 'Type1.Palliative',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 1,
    Comp5Min: 240.51,
    Comp5Plus: 320.68
  }).save();
  new TimeCredit({
    type: 100,
    minAge: 0,
    motivation: 'Type1.Palliative',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 1,
    Comp5Min: 481.02,
    Comp5Plus: 641.37
  }).save();


  new TimeCredit({
    type: 20,
    minAge: 0,
    motivation: 'Type1.Education',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 6,
    Comp5Min: 158.38,
    Comp5Plus: 204.39
  }).save();
  new TimeCredit({
    type: 50,
    minAge: 0,
    motivation: 'Type1.Education',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 6,
    Comp5Min: 240.51,
    Comp5Plus: 320.68
  }).save();
  new TimeCredit({
    type: 100,
    minAge: 0,
    motivation: 'Type1.Education',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 36,
    minMonths: 6,
    Comp5Min: 481.02,
    Comp5Plus: 641.37
  }).save();

  new TimeCredit({
    type: 20,
    minAge: 0,
    motivation: 'Type2.Disabled',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 48,
    minMonths: 6,
    Comp5Min: 158.38,
    Comp5Plus: 204.39
  }).save();
  new TimeCredit({
    type: 50,
    minAge: 0,
    motivation: 'Type2.Disabled',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 48,
    minMonths: 6,
    Comp5Min: 240.51,
    Comp5Plus: 320.68
  }).save();
  new TimeCredit({
    type: 100,
    minAge: 0,
    motivation: 'Type2.Disabled',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 48,
    minMonths: 6,
    Comp5Min: 481.02,
    Comp5Plus: 641.37
  }).save();

  new TimeCredit({
    type: 20,
    minAge: 0,
    motivation: 'Type2.ChildMed',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 48,
    minMonths: 1,
    Comp5Min: 158.38,
    Comp5Plus: 204.39
  }).save();
  new TimeCredit({
    type: 50,
    minAge: 0,
    motivation: 'Type2.ChildMed',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 48,
    minMonths: 1,
    Comp5Min: 240.51,
    Comp5Plus: 320.68
  }).save();
  new TimeCredit({
    type: 100,
    minAge: 0,
    motivation: 'Type2.ChildMed',
    minCareer: 0,
    minCareerAM: 2,
    MaxMonths: 48,
    minMonths: 1,
    Comp5Min: 481.02,
    Comp5Plus: 641.37
  }).save();
};


exports.find = async function(name) {
  try {
    let query = {
      motivation: name.motivation,
      minCareer: { $lte: name.working },
      minCareerAM: { $lte: name.workingAm },
      type: name.type,
    };


    return await TimeCredit.findOne(query);
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while Paginating Hrx');
  }
};
