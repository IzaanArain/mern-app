const asyncHandler=require('express-async-handler')

const Goal =require('../models/goalModel')
const User =require('../models/userModel')
const { use } = require('../routes/userRoutes')

// @desc Get goal
// @route Get /api/goals
// @access Private
const getGoals= asyncHandler(async (req,res)=>{
    const goals=await Goal.find({user: req.user.id})
    res.status(200).json(goals)
    // res.status(200).json({message:'Get goals'})
})

// @desc Set goal
// @route Post /api/goals
// @access Private
const setGoals= asyncHandler(async (req,res)=>{
    // console.log(req.body);
    if(!req.body.text){ // to use body data add middleware
        res.status(400)
        throw new Error('please add a text field')
    }
    const goal=await Goal.create({
        text: req.body.text,
        user:req.user.id,
    })
    res.status(200).json(goal)
    // res.status(200).json({message:'Set goals'})
})

// @desc Update goal
// @route Put /api/goals
// @access Private
const updateGoals= asyncHandler(async (req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //get the user
    // const user=await User.findById(req.user.id)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal=await Goal.findOneAndUpdate(req.params.id,req.body,{new: true})

    res.status(200).json(updatedGoal)
    // res.status(200).json({message:`Put goals ${req.params.id}`})
})

// @desc Delete goal
// @route Delete /api/goals/:id
// @access Private
const deleteGoals= asyncHandler(async (req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //get the user
    // const user=await User.findById(req.user.id)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

     res.status(200).json({id:req.params.id})
    // res.status(200).json({message:`Delete goals ${req.params.id}`})
})

module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}