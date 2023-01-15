const reactIntl = "\n\
\n\
# Localizing your React-Redux application with react-Intl\n\
\n\
> Edit: I originally wrote this blog on _July 14, 2019_ on medium. \n\
\n\
This topic is not something that often comes up in tutorials and not always something you get to do when starting a greenfield project if indeed you’re lucky enough in your career as a developer to be there on the ground floor at the genesis of a new project. But localizing an application so that the user can read the text in their native language is something I have been involved with twice.\n\
\n\
The first time was localizing a legacy Winforms application which I will talk about in a future post. The second was localizing the new React app with its favorite partner Redux.\n\
\n\
`react-intl` ([https://github.com/yahoo/react-intl](https://github.com/yahoo/react-intl)) is a library that helps you out by taking care of a lot of the heavy lifting of translation and number formatting. In this post, I’m going to focus on translation and how to update the Redux store so that the UI text language is then changed based upon user interaction.\n\
\n\
I am assuming that you know how to get set up with React and Redux, and you know what reducers and action creators are.\n\
\n\
The first thing to do is to install `react-intl` you do this with npm using:\n\
```\n\
npm i react-intl\n\
```\n\
\n\
## The Extra Pieces\n\
There a couple of moving pieces from  `react-intl`  that help get all of this working:\n\
\n\
**IntlProvider**  — this sits at the root of your application’s JSX above any in the component tree that will have translated text. Essentially it can be thought of akin to the react-redux Provider or the React-Router Router object.\n\
\n\
**addLocaleData**  — A function that adds locale data which is set during the initialization of the application.\n\
\n\
A plain old JSON object (more on this later), but essentially this will hold keys based on the locale code for example “en” for English or “ja” for Japanese, that then holds values for the translations.\n\
\n\
**FormattedMessage**  — This object is what we will wrap our translations with. It takes two properties the first  `id`  being the key to the translation contained in the JSON object, the second being  `defaultMessage`  should there be an issue in displaying the translation.\n\
\n\
## Show me the code\n\
\n\
Let's start at the root of the application — typically you will have something like this:\n\
\n\
```\n\
import React from 'react';\n\
import { Provider } from 'react-redux';\n\
import store from 'reducers/configureStore';\n\
import AppRouter from './appRouter';\n\
\n\
\n\
const App = ({ store }) => (\n\
  <Provider store={store}>\n\
    <ApplicationTree />\n\
  </Provider>\n\
);\n\
\n\
export default App;\n\
```\n\
\n\
`ApplicationTree`  in this case would be the rest of your application whatever it may be wrapped with the Redux provider.\n\
\n\
To carry on with the  `ApplicationTree`, that would then look something like this:\n\
\n\
```\n\
import React from 'react';\n\
import PropTypes from 'prop-types';\n\
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';\n\
import { IntlProvider, addLocaleData } from 'react-intl';\n\
import { connect } from 'react-redux';\n\
import languageObject from 'translations/messages';\n\
import HomeComponent from './home/homeComponent';\n\
\n\
\n\
import en from 'react-intl/locale-data/en';\n\
import ja from 'react-intl/locale-data/ja';\n\
\n\
addLocaleData(en);\n\
addLocaleData(ja);\n\
\n\
\n\
export const ApplicationTree = (props) => {\n\
  return (\n\
    <div>\n\
      <Router>\n\
        <IntlProvider locale={props.locale} messages={languageObject[props.locale]}>\n\
          <div>\n\
            <Switch>\n\
              <Route path=\"/\" exact component={HomeComponent} />\"\n\
            </Switch>\n\
          </div>\n\
        </IntlProvider>\n\
      </Router>\n\
    </div>\n\
  );\n\
};\n\
\n\
ApplicationTree.defaultProps = {\n\
  locale: 'ja',\n\
};\n\
\n\
ApplicationTree.propTypes = {\n\
  locale: PropTypes.string,\n\
};\n\
\n\
const mapStateToProps = state => ({ locale: state.localeReducer.locale });\n\
\n\
export default connect(mapStateToProps)(ApplicationTree);\n\
```\n\
\n\
There are a few things going on here, the first in that we are bringing in the components we want to use later in our JSX (`IntlProvider`  and  `addLocalData`) then we have imported our  `LanguageObject`  (our JSON translation data) and brought in our  `HomeComponent`  which will be a page component that will be connected to react-redux and will contain some text that will be updated on the page in a language we choose.\n\
\n\
Next we are bringing in our locales on lines 9–10 then adding that data to the context of  `IntlProvider`  on 12–13.\n\
\n\
We also have  `mapStateToProps`  this sets the  `props.locale`  property on the component and updated the applications  `IntlProvider`  when a different locale is selected.\n\
\n\
`IntlProvider`  needs to know what the locale setting is, this is done with it’s “locale” property which we have set to the  `props.locale`  of the component, lastly it takes a messages object with it’s “messages” property which is again set depending on the props.locale.\n\
\n\
The messages object as mentioned above is a JSON object which contains the keys and translations which will be used throughout the application, this can be broken out into separate files as you wish, our example is in one file and looks like this:\n\
\n\
```\n\
const languageObject = {\n\
  en: {\n\
    'homeComponent.title': 'Home Component',\n\
    'homeComponent.english': 'English',\n\
    'homeComponent.japanese': 'Japanese',\n\
  },\n\
  ja: {\n\
    'homeComponent.title': 'ホームコンポーネント',\n\
    'homeComponent.english': '英語',\n\
    'homeComponent.japanese': '日本人',\n\
  },\n\
};\n\
\n\
export default languageObject;\n\
```\n\
\n\
The `props.locale` will be a string, either ‘en’ or ‘ja’ and will be used as a key to select the inner objects containing the translations.\n\
\n\
Our `HomeComponent` is connected to react-redux and contains the  `FormattedMessage`  component and looks like this:\n\
\n\
```\n\
import React from 'react';\n\
import { connect } from 'react-redux';\n\
import { FormattedMessage } from 'react-intl';\n\
import changeLocale from 'actions/locale/localeActionCreators';\n\
\n\
const homeComponent = (props) => {\n\
  return (\n\
    <div>\n\
      <FormattedMessage id=\"homeComponent.title\" defaultMessage=\"Default message\" />\"\n\
      <button type=\"button\" onClick={ () => {props.dispatch(changeLocale('en')) }}><FormattedMessage id=\"homeComponent.english\" defaultMessage=\"Default message\" /></button>\"\n\
      <button type=\"button\" onClick={ () => {props.dispatch(changeLocale('ja')) }}><FormattedMessage id=\"homeComponent.japanese\" defaultMessage=\"Default message\" /></button>\"\n\
    </div>\n\
  );\n\
}\n\
\n\
export default connect()(homeComponent);\n\
```\n\
\n\
For simplicity, I have directly imported the action creator and directly dispatching from  `props.dispatch`. There are three  `FormattedMessage`  components, one that contains the title and two buttons that will take an action creator function that each take a locale string (‘en’ or ‘ja’) and dispatch them to the reducer.\n\
\n\
As you can see if there is anything wrong in the update or an incorrect key is sent to a component then the default message will be displayed.\n\
\n\
The action types and action creators are quite simple and look like this:\n\
\n\
```\n\
export const CHANGE_LOCALE_LANGUAGE_SUCCESS = 'CHANGE_LOCALE_LANGUAGE_SUCCESS';\n\
\n\
--------------------\n\
\n\
import * as localeActionTypes from './localeActionTypes';\n\
\n\
export default function changeLocale(locale) {\n\
  return { type: localeActionTypes.CHANGE_LOCALE_LANGUAGE_SUCCESS, locale };\n\
}\n\
```\n\
\n\
The final part of course is our locale Reducer, this will contain an action type and create a new state which when updated will update the `ApplicationTree` component which will then filter down and update other components which have `FormattedMessage` components, the code for the reducer looks like this:\n\
\n\
```\n\
import * as localeActionTypes from 'actions/locale/localeActionTypes';\n\
\n\
export default (state = { locale: 'ja' }, action = {}) => {\n\
  switch (action.type) {\n\
    case localeActionTypes.CHANGE_LOCALE_LANGUAGE_SUCCESS:\n\
      return { ...state,\n\
        locale: action.locale };\n\
\n\
    default:\n\
      return state;\n\
  }\n\
};\n\
```\n\
\n\
Of course, you must not to forget to add the reducer to the `combineReducers` Redux method when creating your store.\n\
\n\
## Wrapping up\n\
That is pretty much it for adding basic localisation to a react Redux application, there are just the basic moving parts that you would expect to find within any new feature you may add to your application, reducers, action creators and components which all work with the flow of your application.\n\
\n\
If you happen to have installed the Redux chrome extension and installed that into your application, you can see the application change state and see what the locale settings are within the Redux store.\n\
\n\
I hope this guide provides a nice introduction and gets you on your way with react-intl.\n\
";



export default reactIntl;