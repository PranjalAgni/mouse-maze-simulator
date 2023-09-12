def write_to_file(filename):
  stack = [["first"], ["second"], ["third, fourth"]]
  answers = []
  for possible_dirs in stack:
    possible_dirs_str = "".join(possible_dirs)
    answers.append(possible_dirs_str)
  
  with open('{}.txt'.format(filename), 'w') as f:
    # Serializing json
    f.write("\n".join(answers))


def reader(filename):
  file = open("{}.txt".format(filename))
  content = file.read()
  all_directions = content.split("\n");
  explorer_list = []
  for direction in all_directions:
    current_direction = direction.strip().split(",")
    explorer_list.append(current_direction)
  
  return explorer_list

print(reader("path"))