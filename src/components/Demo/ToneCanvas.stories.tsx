import type { Meta, StoryObj } from '@storybook/react';
import ToneCanvas from './ToneCanvas';

const meta = {
  component: ToneCanvas,
} satisfies Meta<typeof ToneCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
