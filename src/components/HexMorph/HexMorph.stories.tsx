import type { Meta, StoryObj } from '@storybook/react';
import HexMorph from './HexMorph';

const meta = {
  component: HexMorph,
} satisfies Meta<typeof HexMorph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
