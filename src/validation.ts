interface Status {
    valid: boolean;
    message?: string;
}

type Rule = (value: string) => Status;

export function length({ min, max }: { min: number; max: number }): Rule {
    return function (value: string): Status {
        const result = Boolean(value.length > min && value.length < max);
        return {
            valid: result,
            message: result
                ? undefined
                : `This filed must be between ${min} and ${max}`,
        };
    };
}

export function required(value: string): Status {
    console.log("required - value: " + value);

    const result = Boolean(value);
    return {
        valid: result,
        message: result ? undefined : "This filed is required",
    };
}

export function validate(value: string, rules: Rule[]): Status {
    for (const rule of rules) {
        const result = rule(value);
        if (!result.valid) {
            return result;
        }
    }
    return {
        valid: true,
    };
}

console.log(
    validate("", [required]),
    validate("username", [required]),
    validate("a", [length({ min: 5, max: 10 })]),
    validate("aaaaaaaa", [length({ min: 5, max: 10 })])
);
