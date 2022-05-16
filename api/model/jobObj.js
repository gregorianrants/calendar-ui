import cuid from 'cuid';

/*const addGcalEvent = require('./../googleCalendar')*/
import validator from 'validator'; //todo can we inmport only a subset

import { setHours } from 'date-fns'
import { nextDay } from 'date-fns';

const customerObj = {
    name: {
        type: String,
        required: true,
        validate: [
            {
                validator: (v) => {
                    return v.length > 4;
                },
                message: `name must have more than 4 characters`,
            },
        ],
    },
    mobile: {
        type: String,
        validate: {
            validator: (v) => {
                return validator.isMobilePhone(v, ["en-GB"]);
            }, //TODO restrict this to uk and have anohter field for other phone numbers.
            message: `must be a valid mobile number`,
        },
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: "must be a valid email",
        },
    },
};

const chargesObj = {
    hourlyRate: { type: Number },
    fuelCharge: { type: Number },
    travelTime: { type: Number },
};

const addressObj = {
    _id: {
        type: String,
        default: cuid,
    },
    value: {
        validate: {
            validator: (v) => {
                return v.length > 4;
            },
            message: `address must have more than 4 characters`,
        },
        type: String,
    },
};

const operativeObj = {
    _id: {
        type: String,
        default: cuid,
    },
    value: {
        validate: {
            validator: (v) => {
                return v.length > 3;
            },
            message: `operative must have more than 3 characters`,
        },
        type: String,
    },
};

const jobObj = {
    _id: {
        type: String,
        default: cuid,
    },
    isFake: {
        type: Boolean,
        default: false
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    customer: customerObj,
    charges: chargesObj,
    items: String,
    addresses: [addressObj],
    operatives: [operativeObj],
    markCompleted: Boolean,
    sub: {
        type: String,//TODO add validation to this using hook as adding it to schema will cause to fail on client
    },
}

export default jobObj