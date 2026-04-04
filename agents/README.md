# Agents Directory

This directory contains various agents used in the Askly application.

## Contents of the Agents Folder

- **AgentName/**: A folder for each agent containing its code and configuration.
- **README.md**: Documentation related to agents.

## Adding a New Agent

1. Create a new folder for your agent under the agents directory.
2. Include necessary files as per the expected file structure.
3. Document your agent's functionality in a README.md file within your agent's folder.

## Expected File Structure

```
Agents/
  └── AgentName/
      ├── main.py
      ├── config.yaml
      └── README.md
```

## Configuration Conventions

- Use **YAML** format for configuration files.
- Follow naming conventions: use lower_case_with_underscores for file names.

## Running/Testing Agents Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/aminharoon/Askly.git
   cd Askly
   ```
2. Install required dependencies (if any):
   ```bash
   pip install -r requirements.txt
   ```
3. Run the agent: 
   ```bash
   python path/to/your/agent/main.py
   ```

## Contributing

- Fork the repository.
- Create a feature branch: `git checkout -b feature/YourAgent`
- Make your changes and commit them.
- Push to the branch: `git push origin feature/YourAgent`
- Open a pull request detailing your changes.

---

### Example Agent Scaffold

```python
# Example Agent

class ExampleAgent:
    def __init__(self):
        # Initialization code
        pass

    def run(self):
        # Code to run the agent
        pass
```