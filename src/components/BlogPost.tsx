import * as React from 'react';
import Markdown from './Markdown';

export default function BlogPost(props: { key: number, text: string }) {
  return (
    <Markdown className="markdown" key={props.key}>
      {props.text}
    </Markdown>
  );
}