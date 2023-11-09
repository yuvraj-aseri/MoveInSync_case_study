import { randomUUID } from "crypto"
import express from 'express';
import { DATA_FEATCHED, DATA_NOT_FOUND, DATA_NOT_SAVED, DATA_REMOVED_SUCCESSFULLY, DATA_SAVED, DATA_UPDATED, ERROR_WHILE_FEATCHING_DATA } from "../utils/constants/global.constants";
import ContactModel from "../DBModels/Contacts";

class Main {
    //Contact
    getContacts = (req: express.Request, res: express.Response) => {
        const searchByType = req.query.type;
        const input_field = req.query.input;
        if(input_field == "" || !input_field || !searchByType){
            ContactModel.aggregate([{
                $project : {_id : 0}
              }])
                .exec()
                .then((result: any) => {
                    res.json({ err: false, data: result, msg: DATA_FEATCHED });
                })
                .catch(err => {
                    console.log(err)
                    res.json({ err: true, data: err, msg: ERROR_WHILE_FEATCHING_DATA });
                })
            
        }else{
        ContactModel.aggregate([{
            $match: {
              [searchByType.toString()]: { $regex: `^${input_field}`, $options: "i" }
            }
          }])
            .exec()
            .then((result: any) => {
                res.json({ err: false, data: result, msg: DATA_FEATCHED });
            })
            .catch(err => {
                console.log(err)
                res.json({ err: true, data: err, msg: ERROR_WHILE_FEATCHING_DATA });
            })}
    }
    getContactByID = (req: express.Request, res: express.Response) => {
        const id: any = req.query.id;
        ContactModel.aggregate([
            {
                $match: { id: parseInt(id) }
            }
        ])
            .exec()
            .then((result: any) => {
                console.log("Result : ", result)
                res.json({ err: false, data: result, msg: DATA_FEATCHED });
            })
            .catch(err => {
                console.log(ERROR_WHILE_FEATCHING_DATA)
                res.json({ err: true, data: err, msg: ERROR_WHILE_FEATCHING_DATA });
            })
    }
    addContact = (req: express.Request, res: express.Response) => {
        ContactModel.aggregate([
            {
                $group: {
                    _id: null, // Use null to group all documents together
                    maxField: { $max: "$id" } // $max accumulator to find the maximum value of fieldName
                }
            }
        ])
            .exec()
            .then(result => {
                console.log(result)
                const newContact = {
                    id: (result[0]?.maxField || 0) + 1,
                    name: req.body.name,
                    email : req.body.email,
                    dob: req.body.dob,
                    number: req.body.number,
                }
                const Contact = new ContactModel(newContact).save()
                    .then((savedContact) => {
                        console.log('Contact instance saved successfully:' + JSON.stringify(savedContact));
                        res.json({ err: false, data: savedContact });
                    })
                    .catch((error) => {
                        console.log("Error : ", error)
                        res.status(500).json({ err: true, data: error })
                    });
            }
            )
            .catch(err => console.log(err))
    }
    updateContact = (req: express.Request, res: express.Response) => {
        const filter = { id: req.query.id };

        // Define the fields you want to update and their new values

        const update = {
            $set: req.body
        };
        ContactModel.updateOne(filter, update, { new: true })
            .then((result: any) => {
                if (result.modifiedCount) {
                    this.getContactByID(req, res)
                }
                else {
                    res.json({ err: false, data: result, notFound: true })
                }
            })
            .catch((error) => {
                res.status(500).json({ err: true, data: error })
            });
    }
    deleteContact = (req: express.Request, res: express.Response) => {
        const filter = { id: req.query.id };
        ContactModel.deleteOne(filter)
            .then((result: any) => {
                console.log(result)
                if (result.deletedCount) {
                    res.json({ err: false, data: result })
                }
                else {
                    res.json({ err: false, data: result, notFound: true })
                }
            })
            .catch((error) => {
                res.status(500).json({ err: true, data: error })
            });
    }
    deleteAllContacts = (req: express.Request, res: express.Response) => {
        ContactModel.deleteMany({})
            .then((result: any) => {
                console.log(result)
                if (result.deletedCount) {
                    res.json({ err: false, data: result })
                }
                else {
                    res.json({ err: false, data: result, notFound: true })
                }
            })
            .catch((error) => {
                res.status(500).json({ err: true, data: error })
            });
    }
}

export default new Main();




