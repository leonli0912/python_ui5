import xml.etree.ElementTree as ET

def transfer():

	tree = ET.parse('./tmp/IDCN_BSAIS.XDP')
	root = tree.getroot()

	for binding in tree.iter('{http://www.xfa.org/schema/xfa-template/2.5/}bind'):
		#if binding.attrib == 'ref':
		print(binding.attrib)
		if binding.attrib['match'] != "none":
			#print('ref:',binding.attrib['ref'])
			ref=binding.attrib['ref']
			nodepath=ref.split('.')
			#print(nodepath)
			field0=nodepath[len(nodepath)-1]        
			prefix=ref[0:ref.rfind(field0)]  
			field=field0.lower().title()

		#print('prefix:',prefix)
		if prefix == 'GS_FORMHDR.':#
			newref = '$.SettingNode.Header.'+field 
			binding.set('ref',newref)            
		elif prefix == 'GT_FORMLINES_AS.DATA[*].':#GT_FORMLINES_AS.DATA[*].LINETEXT
			newref = '$.SettingNode.Header.ItemAS.ItemNode_AS[*].'+field
			binding.set('ref',newref)
		elif prefix == 'GT_FORMLINES_LE.DATA[*].':#GT_FORMLINES_LE.DATA[*].LINETEXT
			newref = '$.SettingNode.Header.ItemLE.ItemNode_LE[*].'+field            
			binding.set('ref',newref)
		elif prefix == 'GT_FORMLINES_PL.DATA[*].':#GT_FORMLINES_PL.DATA[*].LINETEXT
			newref = '$.SettingNode.Header.ItemPL.ItemNode_PL[*].'+field
			binding.set('ref',newref)
		elif prefix == 'GT_FORMLINES_AS1.DATA[*].':#GT_FORMLINES_AS1.DATA[*].LINETEXT
			newref = '$.SettingNode.Header.ItemAS.ItemNode_AS1[*].'+field
			binding.set('ref',newref)
		elif prefix == 'GT_FORMLINES_LE1.DATA[*].':#GT_FORMLINES_LE1.DATA[*].LINETEXT
			newref = '$.SettingNode.Header.ItemLE.ItemNode_LE1[*].'+field
			binding.set('ref',newref)
		#print('NEW arrib:',binding.attrib)
	tree.write('./tmp/IDCN_BSAIS_xfa2.XML')