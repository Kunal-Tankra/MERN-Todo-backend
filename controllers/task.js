import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const user = req.user


        await Task.create({
            title,
            description,
            user
        })

        res.status(201).json({
            success: true,
            message: "Task added Successfully"
        })

    } catch (error) {
        next(error)
    }


}

export const getMyTasks = async (req, res, next) => {
    try {
        const user = req.user

        const tasks = await Task.find({ user: user._id })

        if (!tasks) {
            return next(new ErrorHandler("Task not found", 404))
        }

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const _id = req.params.id

        const task = await Task.findById({ _id })

        if (!task) {
            return next(new ErrorHandler("Task not found", 404))
        }


        await Task.updateOne({ _id }, {
            $set: {
                isCompleted: !task.isCompleted
            }
        })

        res.json({
            success: true,
            task: "Task Updated"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const _id = req.params.id

        const task = await Task.findById(_id)

        if (!task) {
            return next(new ErrorHandler("Task not found", 404))
        }

        const dlt = await Task.deleteOne({ _id })
        console.log(dlt, "deleted task")


        res.json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error)
    }
}

