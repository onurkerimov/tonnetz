import type { Meta, StoryObj } from '@storybook/react';
import ToneCanvas from './ToneCanvas';
import { useState, useEffect } from 'react';

const Template = (props: {states: number[]}) => {
  const { states } = props
  const [progress, setProgress] = useState(0)

  const listener = () => setProgress((s) => {
    const arr = states
    const i = arr.findIndex((e) => e === s)
    return arr[(i + 1) % (arr.length)]
  })

  return <ToneCanvas progress={progress} onClick={listener} />
}

const meta = {
  component: Template,
} satisfies Meta<typeof Template>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    states: [0, 1]
  },
};

export const TriState: Story = {
  args: {
    states: [0, 0.49999, 1, 0.5]
  },
};
