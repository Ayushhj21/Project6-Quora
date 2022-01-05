const college = await CollegeModel.findOne({name:req.query.collegeName, isDeleted:false})
if(!college){
   return res.status(404).send({ status: false, message: 'No data found for this college' })
}
 const { name, fullName, logoLink } = college;
 const id = (college._id).toString()
 const interests = await internModel.find({ collegeId: id, isDeleted:false}).select({ name: 1, _id: 1, email:1, mobile:1 })
 if((Object.keys(interests).length > 0)){
     const internfromcollege= {
         name,
         fullName,
         logoLink,
         interests: interests
     }
     res.status(200).send({ status: true, message: "College data found successfully", data: internfromcollege });
  }
  if(!(Object.keys(interests).length > 0)){
     const internfromcollege= {
         name,
         fullName,
         logoLink,
         interests: "No student present for internship"
     }
     res.status(200).send({ status: true, message: "College data found successfully", data: internfromcollege });
  }
}
catch (error) {
 res.status(500).send({ status: false, Errormsg: error.message })
}
};
