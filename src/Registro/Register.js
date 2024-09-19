"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const UserForm_tsx_1 = __importDefault(require("./UserForm.tsx"));
require("./Register.css");
const Register = () => {
    const [show, setShow] = (0, react_1.useState)(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "registro-container" }, { children: (0, jsx_runtime_1.jsx)(UserForm_tsx_1.default, {}) })) }));
};
exports.default = Register;
