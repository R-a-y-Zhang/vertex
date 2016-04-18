import json
import networkx as nx
import re
json_file = open("../output.json",'r')
real_json = json.load(json_file)
tld = []
first = None

G  = nx.DiGraph()

f = open('out.py', 'w');

def comesFromProc(startNode, endNode):
    return any(map(lambda t: t == G.edge[startNode][endNode]["start"], ["procOut", "else", "child"]))

def getFurthestRight(node):
    out = []
    if not((not G.successors(node)) or all(map(lambda x: comesFromProc(node, x), G.successors(node)))):
        for i  in filter (lambda x: not comesFromProc(node, x), G.successors(node)):
            out += getFurthestRight(i)
        return out
    else:
        return [node]

def makeCode(node, indent=0):
    ports = {}
    for t in G.predecessors(node):
        if comesFromProc(t, node):
            continue
        else:
            temp = makeCode(t)
            ports[G.edge[t][node]["end"]] = temp

    out = G.node[node]["python"].format(**ports)
    padding = "    "
    realPadding = "" 
    for i in range(0, indent):
        realPadding += padding

    if "=" in G.node[node]["python"]:
        f.write(realPadding + out + '\n')
        out = G.node[node]["label"]

    if (not G.successors(node)) or all(map(lambda t: comesFromProc(node, t), G.successors(node))):
        f.write(realPadding + out + '\n')
        if G.successors(node) and comesFromProc(node, G.successors(node)[0]):
            for i in G.successors(node):
                if (G.edge[node][i]["end"] == "parent"):
                    for j in getFurthestRight(i):
                        makeCode(j, indent + 1)
            for i in G.successors(node):
                if (G.edge[node][i]["end"] == "parent"):
                    continue
                for j in getFurthestRight(i):
                    makeCode(j,indent)
    else:
        return out

for obj in real_json:
    
    for node in real_json[obj]:
        if "source" in node:
            G.add_edge(node["source"]["id"], node["target"]["id"], start = node["source"]["port"], end = node["target"]["port"])
        else:
            t = node["fstChild"]
            if t:
                G.add_edge(node["id"], node["fstChild"], start = node["chld"], end = node["prnt"])

#        print (json.dumps(node, indent=4, sort_keys=True))
    for node in real_json[obj]:
        if "source" not in node:
            G.node[node["id"]]["label"] = node["attrs"][".label"]["text"]
            G.node[node["id"]]["python"] = node["python"]
            if node["python"] == "#start of execution\n":
                first = node["id"]



for i in G.nodes():
    for path in nx.all_simple_paths(G,first,i):
        if path == None:
            tld.append(i)
        break

#for i in tld:
#    makeCode(i)
makeCode(first)
f.close()
