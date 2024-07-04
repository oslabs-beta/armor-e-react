import type { Meta, StoryObj } from '@storybook/react';
import EmailInput from '../../../templates/login-signup-template/components/Email/EmailInput';



const meta = {
  title: 'Example/Email',
  component: EmailInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof EmailInput>;



