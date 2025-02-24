import subprocess

def get_target_path(files):
    l = []
    for file in files:
        path = file.split('/')
        if path[0] != 'content':
            continue

        if path[1] == 'poetry':
            filepath = path[len(path)-1]
            filename = filepath.split('.md')[0]
            l.append(f'https://www.meganii.com/poetry/tanka/{filename}/')
    return l


# command = 'git show 93aa8becc6d6bf670a07e3d9c9c2ae2b72142dec --name-only --pretty=format:""'
command = 'ls content/poetry/tanka'
result = subprocess.run(command, shell=True, capture_output=True, text=True)
files = result.stdout.split('\n')
urls = get_target_path(files)
print(urls)
