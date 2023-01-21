import reactIntl from './react-intl.md.js';
import jsUnitTestingPt1 from './js-unit-testing-pt1.md.js';
import jsUnitTestingPt2 from './js-unit-testing-pt2.md.js';
import iterators from './iterators.md.js';

interface BlogPostMeta {
  PostText: string,
  PostLink: string,
}

export interface Post {
  Postkey: number,
  PostSummary: string,
  PostText:string,
  PostLink:string,
}

const innerPostArray: Array<BlogPostMeta> = 
  [
   { PostText: reactIntl, PostLink:'/react-intl' },
   { PostText: jsUnitTestingPt1, PostLink:'/js-unit-testing-pt1' },
   { PostText: jsUnitTestingPt2, PostLink:'/js-unit-testing-pt2' },
   { PostText: iterators, PostLink:'/iterators' }
  ];

const PostArray: Array<Post> = innerPostArray
      .reverse()
      .map((x, i) => ({ ...x, Postkey:i, PostSummary: `${x.PostText.substring(0, 500)}...` }));

export default PostArray;