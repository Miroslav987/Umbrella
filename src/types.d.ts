// types.d.ts
declare module 'react-router-hash-link' {
    import { LinkProps, NavLinkProps } from 'react-router-dom';
  
    export interface HashLinkProps extends NavLinkProps {
      smooth?: boolean;
      scroll?: (element: HTMLElement) => void;
    }
  
    export function HashLink(props: HashLinkProps): JSX.Element;
  }
  