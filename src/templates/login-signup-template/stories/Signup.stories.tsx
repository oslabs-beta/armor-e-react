import type { Meta, StoryObj } from '@storybook/react';

import Signup from '../components/Signup/Signup';

const meta = {
  component: Signup,
} satisfies Meta<typeof Signup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: undefined,
    password: true,
    phoneNumber: false,

    username: {
      "validation": {
        "min": 6,
        "errorMessage": "'uh oh spaghetti o'"
      },

      "required": false
    },

    confirmPassword: true,
    validationChecklist: true
  }
};