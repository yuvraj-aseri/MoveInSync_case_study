import axios from "axios";
import {errors,success} from '../enums/messages'
const DomainName = "http://localhost:4000"
export class Contact{
    static getContacts = (type) => {
        const api = `${DomainName}/api/getContacts?type=${type}`
        return axios.get(api)
            .then(res => res.data)
            .then(res => {
                return res.err ? {
                    err: true,
                    data: res.data,
                    msg: errors.FETCHING_ERROR
                } : {
                    err: false,
                    data: res.data,
                    msg: success.FETCHING_SUCCESS
                }
            })
            .catch(err => {
                return {
                    err: true,
                    data: err,
                    msg: errors.FETCHING_ERROR
                }
            })
    }

    static getContactByID = async (id,postProcess = false) => {
        const api = `${DomainName}/api/getContact?id=${id}`
        try {
            const res = await axios.get(api)
            const res_1 = res.data
            return res_1.err ? {
                err: true,
                data: res_1.data,
                msg: errors.FETCHING_ERROR
            } : {
                err: false,
                data: res_1.data,
                msg: success.FETCHING_SUCCESS
            }
        } catch (err) {
            return {
                err: true,
                data: err,
                msg: errors.FETCHING_ERROR
            }
        }
    }

    static addContact = async (body,postProcess = false) => {
        const api = `${DomainName}/api/${postProcess?"PP":""}addContact`
        try {
            const res = await axios.post(api, body)
            const res_1 = res.data
            return res_1.err ? {
                err: true,
                data: res_1.data,
                msg: errors.SAVE_ERROR
            } : {
                err: false,
                data: res_1.data,
                msg: success.SAVE_SUCCESS
            }
        } catch (err) {
            return {
                err: true,
                data: err,
                msg: errors.SAVE_ERROR
            }
        }
    }

    static editContactByID = (id, body,postProcess = false) => {
        const api = `${DomainName}/api/${postProcess?"PP":""}updateContact?id=${id}`
        return axios.post(api, body)
            .then(res => res.data)
            .then(res => {
                return res.err || res.notFound ? {
                    err: true,
                    data: res.data,
                    msg: !res.notFound ? errors.UPDATE_ERROR : errors.NOTFOUND
                } : {
                    err: false,
                    data: res.data,
                    msg: success.UPDATE_SUCCESS
                }
            })
            .catch(err => {
                return {
                    err: true,
                    data: err,
                    msg: errors.UPDATE_ERROR
                }
            })
    }

    static deleteContactByID = (id,postProcess = false) => {
        const api = `${DomainName}/api/${postProcess?"PP":""}deleteContact?id=${id}`
        return axios.post(api)
            .then(res => res.data)
            .then(res => {
                return res.err || res.notFound ? {
                    err: true,
                    data: res.data,
                    msg: !res.notFound ? errors.DELETION_ERROR : errors.NOTFOUND
                } : {
                    err: false,
                    data: res.data,
                    msg: success.DELETION_SUCCESS
                }
            })
            .catch(err => {
                return {
                    err: true,
                    data: err,
                    msg: errors.DELETION_ERROR
                }
            })
    }
}