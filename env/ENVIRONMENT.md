# Environment Variables

## Running configuration

| CONFIG_NAME | DESCRIPTION | VALUES | DEFAULT |
| ----------- | ----------- | ------ | ------- |
| PORT | the port app will listen on | any number| 3000 |
| NODE_ENV | node environment for using the app | `dev`,`prod` | `dev` |


## Logging configuration
| CONFIG_NAME | DESCRIPTION | VALUES | DEFAULT |
|----|----|----|----|
| LOG_LEVEL | define log to output according to pino levels| `info`,`warn`,...| `info`|
| USE_LOG_WRAPPER | wrap log inside the `LOG_WRAPPER_KEY` | `true`, `false` | `false` |
| LOG_WRAPPER_KEY | the key to use for wrapping logs | any wanted name | `payload` |
| PRETTIFY_LOGS | use prettified logs | `true`, `false` | `false` |
| EXLUDE_LOGGING_PATHS | exclude paths from automatic logging | list of paths separated by a comma | `"/ping,/health"`

