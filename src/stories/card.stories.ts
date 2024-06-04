import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';
import { fn } from '@storybook/test';


const meta: Meta<CardComponent> = {
  title: 'Example/Card',
  component: CardComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onShare: fn(),
    onMore: fn(),
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Vertical: Story = {};

export const Horizontal: Story = {};
