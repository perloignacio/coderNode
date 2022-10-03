"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const aws_sdk_1 = require("aws-sdk");
class test {
    constructor() {
    }
    GetFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let storage = new aws_sdk_1.S3({ region: 'us-east-1' });
            try {
                let resp = yield storage.getObject({ Bucket: 'telecom-sh-crm-planes-public', Key: 'planes.json' }).promise();
                let json = JSON.parse(resp.Body.toString());
                if (json) {
                    json.planes.forEach(element => {
                        console.log(element);
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.test = test;
let t = new test();
t.GetFile();
//# sourceMappingURL=test.js.map