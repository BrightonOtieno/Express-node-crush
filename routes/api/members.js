// Bring in Express in order to use its router
const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');




router.get('/',(req,res) =>{
    // want to return a json 
    // res.json converts (array of objects to json)
    res.json(members);
});

// GET A SINGLE USER USING ID
// use request object to grab the id
router.get('/:id',(req,res) =>{

    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found){
        //res.send(req.params.id);
        res.json(members.filter(member=> member.id ===parseInt(req.params.id)));
        
    }else{
            /*if there is no object found(object requested is not found)
            raise a status 400 bad request*/
            res.status(400).json({mg:`No member with id of ${req.params.id}`});
    }
    
});

router.post('/', (req,res) =>{
    // sending the body of their request
    //res.send(req.body);

    // create a new  member object
    const newMember = {
        id: uuid.v4(),
        name:req.body.name,
        status:req.body.status,
    };
    // check if the request came in with name or status( came in correctly)
    // if not then that is a bad error
    if(!newMember.name || !newMember.status){
        return res.status(400).json({msg:'Please include name and status'});
    }
    // then push the new member to the array
    members.push(newMember);
    // the respond to their post  buy sending the entire list of members
    //res.json(members); this is for apis 
    // FOR TEMPLATES 
     res.redirect('/'); //redirecting  back to the same route
});

// PUT UPDATE THE MEMBER
router.put('/:id',(req,res) =>{
    // check if a member with that id exists
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found){
        // if that member with id is found
        // we update thier cridentials

        // update data is in req.body
        const updateMember = req.body;

        // loop through array of members and see if the member with the id exists  then thats the one we update
        
        members.forEach((member) =>{
            if ( member.id === parseInt(req.params.id)){
                // if it exist we update the members cridentials
                member.name = updateMember.name ?  updateMember.name : member.name;
                member.status = updateMember.status ?  updateMember.status : member.status;


                res.json({msg:'Member updated',member:member})
            }
           
        });
        
    }else{
            /*if there is no object found(object requested is not found)
            raise a status 400 bad request*/
            res.status(400).json({mg:`No member with id of ${req.params.id}`});
    }
    
});


// delete

router.delete('/:id',(req,res) =>{
    // check  to see if object with id exists
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found){
        //if it exists 
        /**
         * we are not going to delete it from the array
         * we just want to filter out all objects that are not the one with requested id 
         * and sent them to user
         */
        res.json(members.filter(member=> member.id !==parseInt(req.params.id)));
        
    }else{
            /*if there is no object found(object requested is not found)
            raise a status 400 bad request*/
            res.status(400).json({mg:`No member with id of ${req.params.id}`});
    }
    
});



module.exports = router;
