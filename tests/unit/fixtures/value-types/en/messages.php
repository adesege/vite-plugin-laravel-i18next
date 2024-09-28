<?php

return [
  'string_value' => 'This is a string',
  'number_value' => 42,
  'boolean_value_true' => true,
  'boolean_value_false' => false,
  'null_value' => null,
  'array_value' => ['item1', 'item2'],
  'nested_array' => [
    'key1' => 'value1',
    'key2' => 'value2'
  ],
  'supported_value' => 'This is supported',
  'unsupported_value' => new stdClass(), // This will be an unsupported type
];
