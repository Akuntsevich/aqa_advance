import js from "@eslint/js";

export default [
    js.configs.recommended,

    {
        ignores: ['mochawesome-report/**'],

    },

    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
];