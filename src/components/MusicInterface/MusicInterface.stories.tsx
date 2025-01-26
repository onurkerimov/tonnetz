import type { Meta, StoryObj } from '@storybook/react';
import MusicInterface from './MusicInterface';

const meta = {
  title: 'Components/MusicInterface',
  component: MusicInterface,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MusicInterface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 