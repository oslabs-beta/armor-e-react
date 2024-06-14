import type { Meta, StoryObj } from '@storybook/react';

import PhoneNumberInput from './PhoneNumberInput';

const meta = {
  component: PhoneNumberInput,
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    phoneNumber: "phoneNumber",
    onPhoneNumberChange: () => {}
  }
};