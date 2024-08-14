import './Section.css';
import Container from '../Container/Container.js';
import clsx from 'clsx';
import React, { CSSProperties, ReactNode } from 'react';

type SectionProps = {
  className?: string;
  container?: boolean;
  gap?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Section({ className, style, children, container = true, gap = true }: SectionProps) {
  return (
    <section style={style} className={
      clsx(
        'section',
        className,
        !gap && 'no-gap',
      )}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}