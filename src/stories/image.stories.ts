import type { Meta, StoryObj } from '@storybook/angular';
import { ImageComponent } from './image.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ImageComponent> = {
  title: 'Example/Image',
  component: ImageComponent,
  tags: ['autodocs'],
  argTypes: {
  
  },
  
};

export default meta;
type Story = StoryObj<ImageComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    layout: 'normal',
    src: ["https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg","https://www.we-love-pets.com/files/madison_vet/puppies-kittens.jpg"],
    alt:["Puppy 1", "Puppy 2", "Puppy 3"],
    caption:["Puppy 1", "Puppy 2", "Puppy 3"]
   
  },
};

export const Gallery: Story = {
  args: {
    layout: 'gallery',
    src: ["https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg","https://www.we-love-pets.com/files/madison_vet/puppies-kittens.jpg","https://i.pinimg.com/236x/fb/b2/ee/fbb2ee85f55015b668de1f616f4047f3.jpg"],
    alt:["Puppy 1", "Puppy 2", "Puppy 3"],
    caption:["Puppy 1", null, "Puppy 3"]
   
  },
};

export const Slideshow: Story = {
  args: {
    layout: 'slideshow',
    src: ["https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg","https://www.we-love-pets.com/files/madison_vet/puppies-kittens.jpg","https://i.pinimg.com/236x/fb/b2/ee/fbb2ee85f55015b668de1f616f4047f3.jpg"],
    alt:["Puppy 1", "Puppy 2", "Puppy 3"],
    caption:["Puppy 1 caption", "Puppy 2 caption", null]
  },
};

