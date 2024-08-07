/**
 * @author HusamDababneh [husamdababneh1@gmail.com]
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import jsonata from "jsonata";
import OperationError from "../errors/OperationError.mjs";

/**
 * Jsonata operation
 */
class Jsonata extends Operation {

    /**
     * Jsonata constructor
     */
    constructor() {
        super();

        this.name = "Jsonata expression";
        this.module = "Code";
        this.description = "Extract information from a JSON object with Jsonata query.";
        this.infoURL = "https://docs.jsonata.org/overview.html"; // Usually a Wikipedia link. Remember to remove localisation (i.e. https://wikipedia.org/etc rather than https://en.wikipedia.org/etc)
        this.inputType = "JSON";
        this.outputType = "JSON";
        this.args = [
            {
                name: "Query",
                type: "text",
                value: "eventName"
            },
            /* Example arguments. See the project wiki for full details.
            {
                name: "Second arg",
                type: "number",
                value: 42
            }
            */
        ];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    async run(input, args) {
        if (!input) return "";
        const [firstArg] = args;
        try {
            const expr = jsonata(firstArg);
            const result = await expr.evaluate(input);
            if (!result) return JSON.parse("{}");
            return result;
        } catch (e) {
            throw new OperationError(e.message);
        }
    }

}

export default Jsonata;
