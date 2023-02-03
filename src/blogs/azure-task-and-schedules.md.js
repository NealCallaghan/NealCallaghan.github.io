import image1 from '../Images/Devops1.png';
import image2 from '../Images/Devops2.png';

const pipeline = "\n\
# Adding conditional Tasks to Azure Pipelines with Schedules and Parameters\n\
## Introduction\n\
Within Azure pipelines it’s possible to add custom options at queue time with schedules and parameters within the YAML that will effect not only when the pipeline will run and how frequently but also what build steps are included or excluded from the pipeline. This is then reflected within the pipeline UI in Azure.\n\
\n\
We will take a look at both Schedules and Parameters which are in addition to the normal trigger events for mergers into the main develop branch.\n\
\n\
```\n\
trigger:\n\
  branches:\n\
   include:\n\
    - develop\n\
```\n\
\n\
## Schedules\n\
Schedules can be added to your main pipeline and these can be added to the YAML denoting the `schedules` property. Further Microsoft documentation on schedules can be found [here](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/scheduled-triggers?view=azure-devops&tabs=yaml).\n\
\n\
These schedules are activated on a timer and that can be expressed as a cron trigger which allows you to specify five entries (Azure functions have six and include a “seconds” entry). Starting from the left these allow you to specify “minutes“, “hours“, “days“, “months“ and “days of the week“.\n\
\n\
For example the following specifies a midnight run:\n\
```\n\
\"0 0 * * *\"\"\n\
```\n\
To include days of the week you would include `Mon-Fri` so that the pipeline wouldn’t run over the weekend:\n\
```\n\
\"0 0 * * Mon-Fri\"\"\n\
```\n\
Finally if debugging and you wanted this to run every 5 minutes you could specify minutes like this:\n\
```\n\
\"*/5 * * * *\"\"\n\
```\n\
You can include a DisplayName property which is later shown within the UI, setting this (in our example “Daily midnight build“) and the cron allows you to see the intervals under `pipelines->settings->schedule runs`:\n\
" +
`<center><img src="${image1}"></center>\n` +
"\n\
Finally you tell the schedule what branch(es) it should include when it runs:\n\
```\n\
schedules:\n\
- cron: \"0 0 * * Mon-Fri\"\"\n\
  displayName: Daily midnight build\n\
  branches:\n\
    include:\n\
    - develop\n\
```\n\
\n\
## Parameters\n\
Parameters allow you to have customization and control directly over the build at queue time. They can have different types such as string and boolean. More Microsoft documentation on Parameters can be found here.\n\
\n\
Parameters can be added to the script using the `parameters` property, they have a `name` as to how they will be referred to in code, a `type` (boolean or string etc), a `display` name (how it will be referred to on the UI) and a `default` value.\n\
\n\
Our example looks like this:\n\
\n\
```\n\
parameters:\n\
- name: runAutomatedTests\n\
  type: boolean\n\
  displayName: Include Automated Tests in Build\n\
  default: false\n\
```\n\
When added to your YAML script they are picked up and displayed with the Azure UI when requesting a manual run of the pipeline.\n\
" +
`<center><img src="${image2}"></center>\n` +
"\n\
## Conditional Task Execution\n\
Tasks have [control options](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/tasks?view=azure-devops&tabs=yaml#task-control-options) meaning that they allow for boolean expressions to be run before continuing. In creating this expression you can include a conditional to check whether the current execution of the pipeline was a scheduled run or whether a parameter is a value.\n\
\n\
### Schedule condition\n\
To test whether the current run was a schedule, you can use an [inbuilt predefined variable](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml) and test what its value is. For example `variables['Build.Reason']`. \n\
\n\
There are [conditional functions](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/conditions?view=azure-devops&tabs=yaml%2Cstages#examples) such as eq which will return a true or false value.\n\
\n\
To test if Build.Reason was a schedule you would use this conditional expression:\n\
\n\
```\n\
eq(variables['Build.Reason'], 'Schedule')\n\
```\n\
### Parameter condition\n\
To test for a value within a parameter you must surround the parameter with `{{}}` , however you can use the same conditional functions mentioned above.\n\
\n\
To use a parameter condition using the eqfunction you can use the following expression:\n\
```\n\
eq('${{ parameters.runAutomatedTests }}', 'true')\n\
```\n\
Assuming of course the parameter in our case is a boolean.\n\
\n\
### Combining conditions\n\
If we wanted to run specific tasks, say automated tests which we not want to be part of a regular pipeline because they are resource heavy and take a long time on a schedule but also allow QA to run them when they requested so as not to have to wait for nightly results we can combine the above expressions using the `or` function and add this to the condition of a task:\n\
\n\
```\n\
or(eq('${{ parameters.runAutomatedTests }}', 'true'), eq(variables['Build.Reason'], 'Schedule'))\n\
```\n\
Applying this to a pipeline task it would look like this:\n\
```\n\
- task: #reference to task\n\
  condition: or(eq('${{ parameters.runAutomatedTests }}', 'true'), eq(variables['Build.Reason'], 'Schedule'))\n\
  displayName: #\n\
  inputs:\n\
    command: #\n\
    projects: #\n\
    arguments: #\n\
```\n\
## Conclusion\n\
In this short post we looked at predefined variables that are set within the pipeline when the pipeline runs which indicate what started the pipeline. We looked at schedules and what they are and how they can be set to give us different intervals.\n\
\n\
We also took a look at parameters and how they can be used by a user at queue time to effect behavior within the pipeline script.\n\
\n\
Finally we looked at how we can use conditionals on both schedules and parameters and how they can be combined on a task to effect whether it should run or not as part of the pipeline as a whole.\n\
";

export default pipeline;