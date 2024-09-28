<?php

return [
  'greeting' => 'Hello, :name!',
  'balance' => 'Your balance is :amount',
  'simple_encapsed' => "Hello, $name!",
  'complex_encapsed' => "Your balance is ${amount} as of {$date}.",
  'mixed_encapsed' => "Welcome, {$user['name']}! You have {$user['messages']} new messages.",
  'user_greeting' => "Welcome, {$user['name']}!",
  'user_stats' => "You have {$user['messages']} new messages and {$user['notifications']} notifications.",
  'nested_access' => "Your first item is {$cart['items'][0]} and your last item is {$cart['items']['last']}.",
];
