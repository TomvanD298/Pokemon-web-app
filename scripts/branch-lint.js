import childProcess from 'child_process';
import util from 'util';

const config = {
    prefixes: ['feature', 'hotfix', 'bugfix', 'release', 'chore'],
    suggestions: {
        features: 'feature',
        feat: 'feature',
        fix: 'hotfix',
        bug: 'bugfix',
        releases: 'release',
    },
    banned: ['wip'],
    skip: [],
    disallowed: ['master', 'main', 'develop', 'staging'],
    separator: '/',
    regex: undefined,
    regexOptions: undefined,
};

/**
 * REGEX EXAMPLES
 *
 * Any jira ticket format with kebab case description
 * /^([A-Z]+-[0-9]{1,5}-[a-z0-9-]{3,60})/
 */

const ERROR_MESSAGES = {
    BRANCH_BANNED: 'Branches with the name "%s" are not allowed.',
    BRANCH_DISALLOWED:
        'Pushing to "%s" is not allowed, please create a branch with a different name.',
    PREFIX_NOT_ALLOWED: 'Branch name prefix "%s" is not allowed.',
    PREFIX_SUGGESTION:
        'Branch name prefix is not allowed, instead of "%s" try "%s".',
    SEPARATOR_REQUIRED: 'Branch "%s" must contain a separator "%s".',
    DOES_NOT_MATCH_REGEX:
        'Branch name "%s" does not match the allowed pattern: "%s"',
};

const ERROR_CODE = 1;
const SUCCESS_CODE = 0;

const validateWithRegex = string => {
    if (config.regex) {
        const REGEX = new RegExp(config.regex, config.regexOptions);
        return REGEX.test(string);
    }

    return true;
};

const getCurrentBranch = () => {
    const branch =
        process.argv[2] ||
        childProcess
            .execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
            .toString();

    return branch.trim();
};

const error = (...args) => {
    console.error(
        'Branch lint:',
        Reflect.apply(util.format, null, args).replace(/\r?\n/g, ''),
    );
    return ERROR_CODE;
};

const validateBranchName = () => {
    const currentBranch = getCurrentBranch();
    const parts = currentBranch.split(config.separator);
    const prefix = parts[0];
    let name = null;
    if (parts[1]) {
        const [, second] = parts;
        name = second;
    }

    if (!!config.skip.length && config.skip.includes(currentBranch)) {
        return SUCCESS_CODE;
    }

    if (!!config.banned.length && config.banned.includes(currentBranch)) {
        return error(ERROR_MESSAGES.BRANCH_BANNED, currentBranch);
    }

    if (
        !!config.disallowed.length &&
        config.disallowed.includes(currentBranch)
    ) {
        return error(ERROR_MESSAGES.BRANCH_DISALLOWED, currentBranch);
    }

    if (config.separator && !currentBranch.includes(config.separator)) {
        return error(
            ERROR_MESSAGES.SEPARATOR_REQUIRED,
            currentBranch,
            config.separator,
        );
    }

    if (!!config.prefixes.length && !config.prefixes.includes(prefix)) {
        if (
            config.suggestions &&
            config.suggestions[prefix] &&
            config.prefixes.includes(config.suggestions[prefix])
        ) {
            error(
                ERROR_MESSAGES.PREFIX_SUGGESTION,
                [prefix, name].join(config.separator),
                [config.suggestions[prefix], name].join(config.separator),
            );
        } else {
            error(ERROR_MESSAGES.PREFIX_NOT_ALLOWED, prefix);
        }

        return ERROR_CODE;
    }

    if (name && !validateWithRegex(name)) {
        return error(ERROR_MESSAGES.DOES_NOT_MATCH_REGEX, name, config.regex);
    }

    return SUCCESS_CODE;
};

const exitCode = validateBranchName();

process.exit(exitCode);
