import type { Meta, StoryObj } from '@storybook/react';
import PianoKeys from './PianoKeys';

const meta = {
  component: PianoKeys,
} satisfies Meta<typeof PianoKeys>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
